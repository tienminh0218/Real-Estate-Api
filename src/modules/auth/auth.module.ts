import { Module, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from '../user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { getJwtConfig } from '../../config/config.service';

@Module({
  imports: [UserService, JwtModule.register(getJwtConfig)],
  providers: [AuthService, Logger],
  controllers: [AuthController],
})
export class AuthModule {}
