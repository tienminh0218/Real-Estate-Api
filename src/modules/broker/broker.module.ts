import { AuthModule } from './../auth/auth.module';
import { PrismaModule } from './../prisma/prisma.module';
import { Module, Logger } from '@nestjs/common';
import { BrokerService } from './broker.service';
import { BrokerController } from './broker.controller';
import { JwtStrategy } from '../auth/strategies/jwt';
import { LocalStrategy } from '../auth/strategies/local';
import { JwtModule } from '@nestjs/jwt';
import { getJwtConfig } from 'src/config/config.service';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [BrokerService, Logger],
  controllers: [BrokerController],
})
export class BrokerModule {}
