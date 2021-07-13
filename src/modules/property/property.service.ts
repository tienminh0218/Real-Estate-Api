import { PrismaService } from './../prisma/prisma.service';
import { Injectable, Logger } from '@nestjs/common';
import { Prisma, Property } from '@prisma/client';
import { CreatePropertyDto } from './dto/create-property.dto';

@Injectable()
export class PropertyService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly logger: Logger,
  ) {}

  async property(
    propertyWhereUniqueInput: Prisma.PropertyWhereUniqueInput,
  ): Promise<Property | null> {
    return this.prismaService.property.findUnique({
      where: propertyWhereUniqueInput,
    });
  }

  async propertys(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PropertyWhereUniqueInput;
    where?: Prisma.PropertyWhereInput;
    orderBy?: Prisma.PropertyOrderByInput;
  }): Promise<Property[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prismaService.property.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createProperty(
    payload: CreatePropertyDto,
    isInclude: boolean,
  ): Promise<Property> {
    const { categoryId, brokerId, projectId, ...data } = payload;

    const include = {
      category: isInclude,
      broker: isInclude,
      project: isInclude,
    };

    return this.prismaService.property.create({
      data: {
        ...data,
        status: 1,
        category: { connect: { id: categoryId } },
        broker: { connect: { id: brokerId } },
        project: { connect: { id: projectId } },
      },
      include,
    });
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
