import { ProjectsService } from './../projects/projects.service';
import { PropertyService } from './../property/property.service';
import { ConfigModule } from '@nestjs/config';
import { Module, Logger } from '@nestjs/common';

import { AuthModule } from './../auth/auth.module';
import { PrismaModule } from './../prisma/prisma.module';
import { BrokerService } from './broker.service';
import { BrokerController } from './broker.controller';
import { UserService } from '../user/user.service';

@Module({
  imports: [PrismaModule, AuthModule, ConfigModule],
  providers: [
    BrokerService,
    Logger,
    ProjectsService,
    PropertyService,
    UserService,
  ],
  controllers: [BrokerController],
})
export class BrokerModule {}
