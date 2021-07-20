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
    propertyWhereUniqueInput: Prisma.PropertyWhereUniqueInput,
    optional: OptionalQueryProperty = {},
  ): Promise<Property | null> {
    try {
      const include = this.getIncludeProperty(optional?.include?.split(','));

      return this.prismaService.property.findUnique({
        where: propertyWhereUniqueInput,
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
  ): Promise<Property[]> {
    try {
      const { where } = params;
      const { skip, take, cursor, orderBy, include: includeQuery } = optional;

      const include =
        params.include || this.getIncludeProperty(includeQuery?.split(','));

      return this.prismaService.property.findMany({
        skip: Number(skip) || undefined,
        take: Number(take) || undefined,
        cursor,
        where,
        orderBy,
        include,
      });
    } catch (error) {
      this.logger.error(error.message);
      throw new BadRequestException(error.message);
    }
  }

  async getPropertiesOfUser(id: string) {
    try {
      return this.userService.users({
        where: { id },
        include: { properties: true, broker: true },
      });
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async getPropertiesOfProject(id: string) {
    try {
      return this.projectsService.projects({
        where: { id },
        include: { properties: true },
      });
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
    projectId: string,
  ): Promise<Property> {
    try {
      const { categoryId, brokerId, location, coordinates, price, name } =
        payload;

      const result = await this.prismaService.property.create({
        data: {
          name,
          location,
          coordinates,
          price,
          category: { connect: { id: categoryId } },
          broker: { connect: { id: brokerId } },
          project: { connect: { id: projectId } },
        },
      });

      return result;
    } catch (error) {
      this.logger.error(error.message);
      if (error.code === 'P2025') {
        throw new BadRequestException('Not found relationship');
      }
    }
  }

  async updateProperty(params: {
    where: Prisma.PropertyWhereUniqueInput;
    data: UpdatePropertyDto;
  }): Promise<Property> {
    try {
      const { where, data } = params;
      const {
        name,
        categoryId,
        location,
        coordinates,
        price,
        status,
        brokerId,
        userId,
      } = data;

      return this.prismaService.property.update({
        where,
        data: {
          name,
          location,
          coordinates,
          price,
          status,
          category: categoryId && { connect: { id: categoryId } },
          broker: brokerId && { connect: { id: brokerId } },
          user: userId && { connect: { id: userId } },
        },
      });
    } catch (error) {
      this.logger.error(error.message);
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
