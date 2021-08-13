import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class BrokerPropertyRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(brokerId: string, propertyId: string, owner: boolean = true) {
    return this.prismaService.brokerProperty.create({
      data: {
        property: { connect: { id: propertyId } },
        broker: { connect: { id: brokerId } },
        owner,
      },
    });
  }
}
