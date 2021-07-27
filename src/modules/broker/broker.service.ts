import { Injectable, Logger, BadRequestException } from '@nestjs/common';

import { CreateBrokerDto } from './dto/create-broker.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BrokerService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly logger: Logger,
  ) {}

  // async createBroker(user: any, data: CreateBrokerDto) {
  //   try {
  //     const { district, city } = data;
  //     const broker = await this.prismaService.broker.create({
  //       data: {
  //         district: district,
  //         city: city,
  //         user: { connect: { id: user.id } },
  //       },
  //     });
  //     return broker;
  //   } catch (error) {
  //     throw new BadRequestException('You are already a Broker!!!');
  //   }
  // }
}
