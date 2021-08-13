import { ProjectsService } from './../projects/projects.service';
import { ConfigModule } from '@nestjs/config';
import { Module, Logger } from '@nestjs/common';

import { AuthModule } from './../auth/auth.module';
import { PrismaModule } from './../prisma/prisma.module';
import { BrokerService } from './broker.service';
import { BrokerController } from './broker.controller';
import { BrokerResolver } from './broker.resolver';
import { BrokerRepository } from './repositories/broker.repository';

@Module({
  imports: [PrismaModule, AuthModule, ConfigModule],
  providers: [
    BrokerService,
    Logger,
    ProjectsService,
    BrokerResolver,
    BrokerRepository,
  ],
  controllers: [BrokerController],
})
export class BrokerModule {}
