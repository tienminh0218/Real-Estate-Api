import { ConfigModule } from '@nestjs/config';
import { Module, Logger } from '@nestjs/common';

import { AuthModule } from './../auth/auth.module';
import { PrismaModule } from './../prisma/prisma.module';
import { BrokerService } from './broker.service';
import { BrokerController } from './broker.controller';

@Module({
  imports: [PrismaModule, AuthModule, ConfigModule],
  providers: [BrokerService, Logger],
  controllers: [BrokerController],
})
export class BrokerModule {}
