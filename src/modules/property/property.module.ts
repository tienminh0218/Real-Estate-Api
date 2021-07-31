import { Module, Logger } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { PropertyController } from './property.controller';
import { PropertyService } from './property.service';
import { PropertyResolver } from './property.resolver';

@Module({
  imports: [PrismaModule],
  controllers: [PropertyController],
  providers: [PropertyService, Logger, PropertyResolver],
})
export class PropertyModule {}
