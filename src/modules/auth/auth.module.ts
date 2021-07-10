import { UserModule } from './../user/user.module';
import { Module, Logger } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { LocalStrategy } from './strategies/local';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { getJwtConfig } from '../../config/config.service';
import { JwtStrategy } from './strategies/jwt';

@Module({
  imports: [UserModule, PassportModule, JwtModule.register(getJwtConfig)],
  providers: [AuthService, Logger, JwtStrategy, LocalStrategy],
  controllers: [AuthController],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
