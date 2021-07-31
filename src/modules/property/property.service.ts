import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { Prisma, Property } from '@prisma/client';

import { PrismaService } from './../prisma/prisma.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { OptionalQueryProperties } from './types/optional-query.type';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { PropertyCustom } from './types/property.type';
import { FilterQuery } from './dto/filter-property.dto';

@Injectable()
export class PropertyService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly logger: Logger,
  ) {}

  async property(param: {
    where?: Prisma.PropertyWhereUniqueInput;
  }): Promise<Property | null> {
    try {
      const { where } = param;

      const result = await this.prismaService.property.findUnique({
        where,
        include: {
          location: true,
        },
      });
      return result;
    } catch (error) {
      this.logger.error(error);
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
    },
    optional: OptionalQueryProperties = {},
  ): Promise<PropertyCustom> {
    try {
      const { where, cursor, orderBy } = params;
      let { page, limit } = optional;
      page = Number(page) || 1;
      limit = Number(limit) || 20;

      const data = await this.prismaService.property.findMany({
        skip: limit * (page - 1),
        take: limit,
        where,
        cursor,
        orderBy,
        include: {
          location: true,
        },
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
      this.logger.error(error);
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

  async getRangeProperties(data: FilterQuery) {
    try {
      const { filterPrice, city, orderBy: orderByPrice, ...optional } = data;
      let [min, max]: (string | number)[] = filterPrice?.split(',') || [];
      min = (min && Number(min)) || undefined;
      max = (max && Number(max)) || undefined;

      const result = await this.properties(
        {
          where: {
            AND: [
              { price: { gte: min, lte: max } },
              {
                location: {
                  city: {
                    contains: city,
                  },
                },
              },
            ],
          },
          orderBy: {
            price: orderByPrice,
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

  async createProperty(
    payload: CreatePropertyDto,
    projectId: string = undefined,
  ): Promise<Property> {
    try {
      const {
        categoryId,
        price,
        name,
        address,
        ward,
        city,
        district,
        lng,
        lat,
      } = payload;

      const data = await this.prismaService.property.create({
        data: {
          name,
          price,
          location: {
            create: {
              address,
              ward,
              city,
              district,
              lat,
              lng,
            },
          },
          category: { connect: { id: categoryId } },
          project: projectId && { connect: { id: projectId } },
        },
        include: {
          location: true,
        },
      });

      return data;
    } catch (error) {
      this.logger.error(error);
      this.logger.error(error.code);
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
      const {
        name,
        categoryId,
        price,
        status,
        userId,
        lat,
        lng,
        address,
        ward,
        city,
        district,
      } = data;

      const result = await this.prismaService.property.update({
        where,
        data: {
          name,
          price,
          status,
          location: {
            update: {
              lat,
              lng,
              address,
              ward,
              district,
              city,
            },
          },
          category: categoryId && { connect: { id: categoryId } },
          user: userId && { connect: { id: userId } },
        },
        include: {
          location: true,
        },
      });

      return result;
    } catch (error) {
      this.logger.error(error);
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
          property: { connect: { id: propertyId } },
          broker: { connect: { id: brokerId } },
          owner: false,
        },
      });

      return result;
    } catch (error) {
      this.logger.error(error);
      if (error.code === 'P2025') {
        throw new BadRequestException('Broker not found');
      }
      if (error.code === 'P2002') {
        throw new BadRequestException('Can not assign owner');
      }
      throw new BadRequestException(error.message);
    }
  }

  async deleteProperty(
    where: Prisma.PropertyWhereUniqueInput,
  ): Promise<boolean> {
    try {
      const result = await this.prismaService.property.delete({
        where,
      });

      return !!result;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error.message);
    }
  }
}
