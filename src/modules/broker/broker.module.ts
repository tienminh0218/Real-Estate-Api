import { ProjectsService } from './../projects/projects.service';
import { PropertyService } from './../property/property.service';
import { ConfigModule } from '@nestjs/config';
import { Module, Logger } from '@nestjs/common';

import { AuthModule } from './../auth/auth.module';
import { PrismaModule } from './../prisma/prisma.module';
import { BrokerService } from './broker.service';
import { BrokerController } from './broker.controller';
import { BrokerResolver } from './broker.resolver';

@Module({
  imports: [PrismaModule, AuthModule, ConfigModule],
  providers: [BrokerService, Logger, ProjectsService, BrokerResolver],
  controllers: [BrokerController],
})
export class BrokerModule {}
