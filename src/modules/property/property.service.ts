import {
  Injectable,
  Logger,
  BadRequestException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { Prisma, Property } from '@prisma/client';

import { ProjectsService } from './../projects/projects.service';
import { UserService } from './../user/user.service';
import { PrismaService } from './../prisma/prisma.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { generateIncludeQuery } from '../../utils/generate-include';
import {
  OptionalQueryProperties,
  OptionalQueryProperty,
} from './types/optional-query.type';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { PropertyCustom } from './types/property.type';

@Injectable()
export class PropertyService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    @Inject(forwardRef(() => ProjectsService))
    private readonly projectsService: ProjectsService,
    private readonly prismaService: PrismaService,
    private readonly logger: Logger,
  ) {}

  getIncludeProperty(listIncludeQuery: string[]) {
    if (!listIncludeQuery) return;

    const listRelation = [
      'category',
      'comments_Property',
      'broker',
      'user',
      'project',
    ];

    return generateIncludeQuery(listRelation, listIncludeQuery);
  }

  async property(
    param: {
      where?: Prisma.PropertyWhereUniqueInput;
      include?: Prisma.PropertyInclude;
    },
    optional: OptionalQueryProperty = {},
  ): Promise<Property | null> {
    try {
      const { where } = param;
      const includeQuery = this.getIncludeProperty(
        optional?.include?.split(','),
      );
      const include = param.include || includeQuery;

      return this.prismaService.property.findUnique({
        where,
        include,
      });
    } catch (error) {
      this.logger.error(error.message);
      throw new BadRequestException(error.message);
    }
  }

  async properties(
    params: {
      where?: Prisma.PropertyWhereInput;
      skip?: number;
      take?: number;
      cursor?: Prisma.PropertyWhereUniqueInput;
      orderBy?: Prisma.PropertyOrderByInput;
      include?: Prisma.PropertyInclude;
    },
    optional: OptionalQueryProperties = {},
  ): Promise<PropertyCustom> {
    try {
      const { where, cursor, orderBy } = params;
      let { page, limit, include: includeQuery } = optional;
      page = Number(page) || 1;
      limit = Number(limit) || 20;

      const include =
        params.include || this.getIncludeProperty(includeQuery?.split(','));

      const data = await this.prismaService.property.findMany({
        skip: limit * (page - 1),
        take: limit,
        where,
        cursor,
        orderBy,
        include,
      });

      return {
        data,
        pagination: {
          page,
          limit,
          totalRows: data.length,
        },
      };
    } catch (error) {
      this.logger.error(error.message);
      throw new BadRequestException(error.message);
    }
  }

  async getPropertiesOfUser(
    id: string,
    optional: OptionalQueryProperties = {},
  ) {
    try {
      const result = await this.properties(
        {
          where: {
            project: {
              company: {
                userId: id,
              },
            },
          },
        },
        optional,
      );

      return result;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async getPropertiesOfProject(
    id: string,
    optional: OptionalQueryProperties = {},
  ) {
    try {
      const result = await this.properties(
        { where: { projectId: id } },
        optional,
      );

      return result;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async getPropertiesOfBroker(
    id: string,
    optional: OptionalQueryProperties = {},
  ) {
    try {
      const result = await this.properties(
        {
          where: {
            broker: {
              every: {
                brokerId: id,
              },
            },
          },
        },
        optional,
      );
      return result;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async getRangeProperties(data: any) {
    try {
      const { gte, lte, location } = data;

      return this.properties({
        where: {
          AND: [
            { price: { gte: Number(gte), lte: Number(lte) } },
            { location },
          ],
        },
      });
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async createProperty(
    payload: CreatePropertyDto,
    projectId: string = undefined,
  ): Promise<Property> {
    try {
      const { categoryId, location, coordinates, price, name } = payload;

      const data = await this.prismaService.property.create({
        data: {
          name,
          location,
          coordinates,
          price,
          category: { connect: { id: categoryId } },
          project: projectId && { connect: { id: projectId } },
        },
      });

      return data;
    } catch (error) {
      this.logger.error(error.message);
      if (error.code === 'P2025') {
        throw new BadRequestException('Not found relationship');
      }
    }
  }

  async createBrokerProperty(
    payload: CreatePropertyDto,
    brokerId: string,
  ): Promise<Property> {
    try {
      if (!brokerId) throw new Error('user need to update their profile');
      const { categoryId, location, coordinates, price, name } = payload;
      const propertyData = await this.createProperty(payload);

      await this.prismaService.brokerProperty.create({
        data: {
          property: { connect: { id: propertyData.id } },
          broker: { connect: { id: brokerId } },
        },
      });

      return propertyData;
    } catch (error) {
      this.logger.error(error);
      if (error.code === 'P2025') {
        throw new BadRequestException('Not found relationship');
      }
      throw new BadRequestException(error.message);
    }
  }

  async updateProperty(params: {
    where: Prisma.PropertyWhereUniqueInput;
    data: UpdatePropertyDto;
  }): Promise<Property> {
    try {
      const { where, data } = params;
      const { name, categoryId, location, coordinates, price, status, userId } =
        data;

      const result = await this.prismaService.property.update({
        where,
        data: {
          name,
          location,
          coordinates,
          price,
          status,
          category: categoryId && { connect: { id: categoryId } },
          user: userId && { connect: { id: userId } },
        },
      });

      return result;
    } catch (error) {
      this.logger.error(error.message);
      if (error.code === 'P2025') {
        throw new BadRequestException('Not found relationship');
      }
      throw new BadRequestException(error.message);
    }
  }

  async assignBroker(payload: { propertyId: string; brokerId: string }) {
    try {
      const { propertyId, brokerId } = payload;

      const result = await this.prismaService.brokerProperty.create({
        data: {
          propertyId,
          brokerId,
          owner: false,
        },
      });

      return result;
    } catch (error) {
      this.logger.error(error.message);
      if (error.code === 'P2003') {
        throw new BadRequestException('Broker not found');
      }
      throw new BadRequestException(error.message);
    }
  }

  async deleteProperty(
    where: Prisma.PropertyWhereUniqueInput,
  ): Promise<Property> {
    return this.prismaService.property.delete({
      where,
    });
  }
}
