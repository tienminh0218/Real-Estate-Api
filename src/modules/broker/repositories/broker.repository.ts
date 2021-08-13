import { Prisma } from '@prisma/client';
import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateBrokerDto } from '../dto/create-broker.dto';
import { UpdateBrokerDto } from '../dto/update-broker.dto';

@Injectable()
export class BrokerRepository {
  constructor(private prismaService: PrismaService) {}

  async isBroker(user: any) {
    const IsBroker = await this.prismaService.broker.findFirst({
      where: { userId: user.id },
    });
    if (!IsBroker) {
      throw new BadRequestException('You are not the Broker!!!');
    }
    return IsBroker;
  }

  async getBrokerOfProject(data: any) {
    const { projectId, projectName } = data;
    let { page, limit } = data;

    page = +page || 1;
    limit = +limit || 5;

    const brokers = await this.prismaService.broker.findMany({
      where: {
        properties: {
          some: {
            property: {
              project: {
                OR: [
                  { id: projectId },
                  { projectName: { contains: projectName } },
                ],
              },
            },
          },
        },
      },
    });
    if (brokers.length === 0) {
      throw new BadRequestException('Brokers not found!!!!');
    }
    return {
      brokers,
      pagination: {
        page,
        limit,
        totalRows: brokers.length,
      },
    };
  }

  async getBrokerOfProperty(data: any) {
    const { propertyId, propertyName } = data;
    let { page, limit } = data;

    page = +page || 1;
    limit = +limit || 5;

    const brokers = await this.prismaService.broker.findMany({
      where: {
        properties: {
          some: {
            property: {
              is: {
                OR: [
                  {
                    id: propertyId,
                  },
                  {
                    name: { contains: propertyName },
                  },
                ],
              },
            },
          },
        },
      },
    });
    if (brokers.length === 0) {
      throw new BadRequestException('Brokers not found!!!!');
    }
    return {
      brokers,
      pagination: {
        page,
        limit,
        totalRows: brokers.length,
      },
    };
  }

  async getBrokerOfDistrictOrCity(data: any) {
    const { district, city } = data;
    let { page, limit } = data;

    page = +page || 1;
    limit = +limit || 5;

    const brokers = await this.prismaService.broker.findMany({
      take: limit,
      skip: limit * (page - 1),
      where: {
        OR: [
          { district: { contains: district } },
          { city: { contains: city } },
        ],
      },
    });
    if (brokers.length === 0) {
      throw new BadRequestException('Brokers not found!!!!');
    }
    return {
      brokers,
      pagination: {
        page,
        limit,
        totalRows: brokers.length,
      },
    };
  }

  async create(user: any, data: CreateBrokerDto) {
    const { district, city, phoneNumber, dob, email } = data;
    const broker = await this.prismaService.broker.create({
      data: {
        phoneNumber: phoneNumber,
        dob: dob,
        email: email,
        district: district,
        city: city,
        user: { connect: { id: user.id } },
      },
    });
    return broker;
  }

  async update(user: any, data: UpdateBrokerDto) {
    const broker = await this.isBroker(user);
    const { district, city, phoneNumber, dob, email } = data;
    return await this.prismaService.broker.update({
      where: { id: broker.id },
      data: {
        phoneNumber: phoneNumber || broker.phoneNumber,
        dob: dob || broker.dob,
        email: email || broker.email,
        district: district || broker.district,
        city: city || broker.city,
      },
    });
  }

  async delete(user: any) {
    const broker = await this.isBroker(user);
    return this.prismaService.broker.delete({ where: { id: broker.id } });
  }
}
