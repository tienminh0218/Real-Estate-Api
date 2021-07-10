import { Module, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from '../user/user.service';

@Module({
  imports: [UserService],
  providers: [AuthService, Logger],
  controllers: [AuthController],
})
export class AuthModule {}
