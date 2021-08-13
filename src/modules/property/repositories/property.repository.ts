import { Injectable } from '@nestjs/common';
import { Prisma, Property } from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';
import { FindOneDto, FindManyDto, UpdateByIdDto } from '../dto/repository.dto';
import { PropertyCustom } from '../types/property.type';
import { OptionalQueryProperties } from '../types/optional-query.type';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { FilterQuery } from '../dto/filter-property.dto';

@Injectable()
export class PropertyRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findOne(params: FindOneDto): Promise<Property> {
    const { where, include } = params;
    return this.prismaService.property.findFirst({ where, include });
  }

  async findById(where: Prisma.PropertyWhereUniqueInput): Promise<Property> {
    return this.prismaService.property.findUnique({
      where,
      include: {
        location: true,
        category: {
          select: {
            id: true,
            nameCategory: true,
          },
        },
      },
    });
  }

  async findPropertiesOfUser(
    userId: string,
    optional: OptionalQueryProperties = {},
  ) {
    return this.findMany(
      {
        where: {
          project: {
            company: {
              userId,
            },
          },
        },
      },
      optional,
    );
  }

  async findPropertiesOfProject(
    projectId: string,
    optional: OptionalQueryProperties = {},
  ) {
    return this.findMany(
      {
        where: { projectId },
      },
      optional,
    );
  }

  async filter(data: FilterQuery) {
    const { filterPrice, city, orderBy: orderByPrice, ...optional } = data;
    let [min, max]: (string | number)[] = filterPrice?.split(',') || [];
    min = (min && Number(min)) || undefined;
    max = (max && Number(max)) || undefined;

    return this.findMany(
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
  }

  async findPropertiesOfBroker(
    brokerId: string,
    optional: OptionalQueryProperties = {},
  ): Promise<any> {
    return this.findMany(
      {
        where: {
          broker: {
            some: {
              brokerId,
            },
          },
        },
        include: {
          broker: {
            where: {
              brokerId,
            },
            select: {
              owner: true,
            },
          },
        },
      },
      optional,
    );
  }

  async findMany(
    params: FindManyDto,
    optional: OptionalQueryProperties = {},
  ): Promise<PropertyCustom> {
    const { where, orderBy, include } = params;
    let { page, limit } = optional;
    page = Number(page) || 1;
    limit = Number(limit) || 20;

    const data = await this.prismaService.property.findMany({
      take: limit,
      skip: limit * (page - 1),
      where,
      orderBy,
      include: {
        location: true,
        ...include,
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
  }

  async create(data: CreatePropertyDto, projectId: string = undefined) {
    const { categoryId, price, name, address, ward, city, district, lng, lat } =
      data;

    return this.prismaService.property.create({
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
  }

  async updateById(params: UpdateByIdDto) {
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

    return this.prismaService.property.update({
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
  }

  async deleteById(where: Prisma.PropertyWhereUniqueInput) {
    return this.prismaService.property.delete({ where });
  }
}
