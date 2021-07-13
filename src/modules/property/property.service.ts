import { PrismaService } from './../prisma/prisma.service';
import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { Prisma, Property } from '@prisma/client';
import { CreatePropertyDto } from './dto/create-property.dto';
import { convertBooleanObject } from '../../utils/optional-query';
import { IncludePropertyType } from './types/include-property.type.';

@Injectable()
export class PropertyService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly logger: Logger,
  ) {}

  getIncludeProperty(obj) {
    const { category, comments_Property, broker, user } = obj;
    return convertBooleanObject({ category, comments_Property, broker, user });
  }

  async property(
    propertyWhereUniqueInput: Prisma.PropertyWhereUniqueInput,
    optional = {},
  ): Promise<Property | null> {
    try {
      const include = this.getIncludeProperty(optional);

      return this.prismaService.property.findUnique({
        where: propertyWhereUniqueInput,
        include,
      });
    } catch (error) {
      this.logger.error(error.message);
      throw new BadRequestException(error.message);
    }
  }

  async propertys(
    params: {
      where?: Prisma.PropertyWhereInput;
    },
    optional: IncludePropertyType<
      Prisma.PropertyWhereUniqueInput,
      Prisma.PropertyOrderByInput
    > = {},
  ): Promise<Property[]> {
    try {
      const { where } = params;
      const { skip, take, cursor, orderBy } = optional;
      const include = this.getIncludeProperty(optional);

      return this.prismaService.property.findMany({
        skip,
        take,
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

  async createProperty(payload: CreatePropertyDto): Promise<Property> {
    try {
      const { categoryId, brokerId, projectId, location, coordinates, price } =
        payload;

      return this.prismaService.property.create({
        data: {
          location,
          coordinates,
          price,
          status: 1,
          category: { connect: { id: categoryId } },
          broker: { connect: { id: brokerId } },
          project: { connect: { id: projectId } },
        },
      });
    } catch (error) {
      this.logger.error(error);
    }
  }

  async updateProperty(params: {
    where: Prisma.PropertyWhereUniqueInput;
    data: Prisma.PropertyUpdateInput;
  }): Promise<Property> {
    const { where, data } = params;
    return this.prismaService.property.update({
      data,
      where,
    });
  }

  async deleteProperty(
    where: Prisma.PropertyWhereUniqueInput,
  ): Promise<Property> {
    return this.prismaService.property.delete({
      where,
    });
  }
}
