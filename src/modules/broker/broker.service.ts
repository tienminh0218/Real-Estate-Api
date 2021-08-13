import { UpdateBrokerDto } from './dto/update-broker.dto';
import { Injectable, Logger, BadRequestException } from '@nestjs/common';

import { CreateBrokerDto } from './dto/create-broker.dto';
import { PrismaService } from '../prisma/prisma.service';
import { BrokerRepository } from './repositories/broker.repository';

@Injectable()
export class BrokerService {
  constructor(
    private readonly brokerRepository: BrokerRepository,

    private readonly prismaService: PrismaService,
    private readonly logger: Logger,
  ) {}

  async getBrokerOfProject(data: any) {
    try {
      return this.brokerRepository.getBrokerOfProject(data);
    } catch (error) {
      this.logger.error(error.message);
      throw new BadRequestException(error.message);
    }
  }

  async getBrokerOfProperty(data: any) {
    try {
      return this.brokerRepository.getBrokerOfProperty(data);
    } catch (error) {
      this.logger.error(error.message);
      throw new BadRequestException(error.message);
    }
  }

  async getBrokerOfDistrictOrCity(data: any) {
    try {
      return this.brokerRepository.getBrokerOfDistrictOrCity(data);
    } catch (error) {
      this.logger.error(error.message);
      throw new BadRequestException(error.message);
    }
  }

  async createBroker(user: any, data: CreateBrokerDto) {
    try {
      return this.brokerRepository.create(user, data);
    } catch (error) {
      this.logger.error(error);
      if (error.code === 'P2002') {
        throw new BadRequestException(
          'Your email or phone number is already used !!!',
        );
      }
      throw new BadRequestException('You are already a Broker!!!');
    }
  }

  async updateBroker(user: any, data: UpdateBrokerDto) {
    try {
      return this.brokerRepository.update(user, data);
    } catch (error) {
      this.logger.error(error);
      if (error.code === 'P2002') {
        throw new BadRequestException(
          'Your email or phone number is already used !!!',
        );
      }
      throw new BadRequestException(error.message);
    }
  }

  async deleteBroker(user: any) {
    try {
      return this.brokerRepository.delete(user);
    } catch (error) {
      this.logger.error(error.message);
      throw new BadRequestException(error.message);
    }
  }
}
