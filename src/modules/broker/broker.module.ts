import { AuthModule } from './../auth/auth.module';
import { PrismaModule } from './../prisma/prisma.module';
import { Module, Logger } from '@nestjs/common';
import { BrokerService } from './broker.service';
import { BrokerController } from './broker.controller';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [BrokerService, Logger],
  controllers: [BrokerController],
})
export class BrokerModule {}
