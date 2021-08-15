import { ConfigModule } from '@nestjs/config';
import { Module, Logger } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { UserModule } from './../user/user.module';
import { LocalStrategy } from './strategies/local';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { configService } from '../../config/config.service';
import { JwtStrategy } from './strategies/jwt';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register(configService.getJwtConfig()),
    ConfigModule,
  ],
  providers: [AuthService, Logger, JwtStrategy, LocalStrategy, AuthResolver],
  controllers: [AuthController],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
