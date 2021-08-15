import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { Prisma, Property } from '@prisma/client';

import { CreatePropertyDto } from './dto/create-property.dto';
import { OptionalQueryProperties } from './types/optional-query.type';
import { FilterQuery } from './dto/filter-property.dto';
import { PropertyRepository } from './repositories/property.repository';
import { FindManyDto, UpdateByIdDto } from './dto/repository.dto';
import { BrokerPropertyRepository } from './repositories/brokerProperty.repository';

@Injectable()
export class PropertyService {
  constructor(
    private readonly propertyRepository: PropertyRepository,
    private readonly brokerPropertyRepository: BrokerPropertyRepository,
    private readonly logger: Logger,
  ) {}

  async property(where: Prisma.PropertyWhereUniqueInput): Promise<Property> {
    try {
      return this.propertyRepository.findById(where);
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error.message);
    }
  }

  async properties(
    params: FindManyDto,
    optional: OptionalQueryProperties = {},
  ): Promise<any> {
    try {
      return this.propertyRepository.findMany(params, optional);
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
      const result = await this.propertyRepository.findPropertiesOfUser(
        id,
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
      const result = await this.propertyRepository.findPropertiesOfProject(
        id,
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
      const result = await this.propertyRepository.findPropertiesOfBroker(
        id,
        optional,
      );

      /* convert property.broker: [{owner: true}] => property.broker = {owner: true} */
      result.data.forEach((property) => {
        property.broker = { ...property.broker[0] };
      });

      return result;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async filterProperties(data: FilterQuery) {
    try {
      const result = await this.propertyRepository.filter(data);
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
      const result = await this.propertyRepository.create(payload, projectId);
      return result;
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
      await this.brokerPropertyRepository.create(brokerId, propertyData.id);

      return propertyData;
    } catch (error) {
      this.logger.error(error);
      if (error.code === 'P2025') {
        throw new BadRequestException('Not found relationship');
      }
      throw new BadRequestException(error.message);
    }
  }

  async updateProperty(params: UpdateByIdDto): Promise<Property> {
    try {
      const result = await this.propertyRepository.updateById(params);
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
      const result = await this.brokerPropertyRepository.create(
        brokerId,
        propertyId,
        false,
      );
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

  async deleteProperty(where: Prisma.PropertyWhereUniqueInput): Promise<any> {
    try {
      const result = await this.propertyRepository.deleteById(where);

      return result;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error.message);
    }
  }
}
