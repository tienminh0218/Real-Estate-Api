import { Module, Logger } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserResolver } from './user.resolver';
import { UserRepository } from './repositories/user.repository';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService, UserRepository, Logger, UserResolver],
  exports: [UserService, UserRepository],
})
export class UserModule {}
