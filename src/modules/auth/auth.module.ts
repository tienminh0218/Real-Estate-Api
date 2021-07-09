import { Module, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';

@Module({
  providers: [AuthService, Logger],
})
export class AuthModule {}
