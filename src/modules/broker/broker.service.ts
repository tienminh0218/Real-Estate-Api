import { PropertyService } from './../property/property.service';
import { ProjectsService } from './../projects/projects.service';
import { Prisma } from '@prisma/client';
import { UpdateBrokerDto } from './dto/update-broker.dto';
import { Injectable, Logger, BadRequestException } from '@nestjs/common';

import { CreateBrokerDto } from './dto/create-broker.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BrokerService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly logger: Logger,
    private readonly projectsService: ProjectsService,
    private readonly propertyService: PropertyService,
  ) {}

  async isBroker(user: any) {
    const IsBroker = await this.prismaService.broker.findFirst({
      where: { userId: user.id },
    });
    if (!IsBroker) {
      throw new BadRequestException('You are not the Broker!!!');
    }
    return IsBroker;
  }

  async getBrokerOfProject(id: Prisma.ProjectWhereUniqueInput) {
    const brokers = await this.projectsService.project(id);
  }

  async getBrokerOfproperty() {}

  async getBrokerOfDistrictOrCity(data: any) {
    try {
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
    } catch (error) {
      this.logger.error(error.message);
      throw new BadRequestException(error.message);
    }
  }

  async createBroker(user: any, data: CreateBrokerDto) {
    try {
      const { district, city } = data;
      const broker = await this.prismaService.broker.create({
        data: {
          district: district,
          city: city,
          user: { connect: { id: user.id } },
        },
      });
      return broker;
    } catch (error) {
      throw new BadRequestException('You are already a Broker!!!');
    }
  }

  async updateBroker(user: any, data: UpdateBrokerDto) {
    try {
      const broker = await this.isBroker(user);

      const { district, city } = data;
      return await this.prismaService.broker.update({
        where: { id: broker.id },

        data: {
          district: district || broker.district,
          city: city || broker.city,
        },
      });
    } catch (error) {
      this.logger.error(error.message);
      throw new BadRequestException(error.message);
    }
  }

  async deleteBroker(user: any) {
    try {
      const broker = await this.isBroker(user);
      return this.prismaService.broker.delete({ where: { id: broker.id } });
    } catch (error) {
      this.logger.error(error.message);
      throw new BadRequestException(error.message);
    }
  }
}
