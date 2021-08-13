import { Module, Logger } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';
import { PropertyController } from './property.controller';
import { PropertyService } from './property.service';
import { PropertyResolver } from './property.resolver';
import { PropertyRepository } from './repositories/property.repository';
import { BrokerPropertyRepository } from './repositories/brokerProperty.repository';

@Module({
  imports: [PrismaModule],
  controllers: [PropertyController],
  providers: [
    PropertyService,
    Logger,
    PropertyResolver,
    PropertyRepository,
    BrokerPropertyRepository,
  ],
  exports: [PropertyRepository, BrokerPropertyRepository],
})
export class PropertyModule {}
