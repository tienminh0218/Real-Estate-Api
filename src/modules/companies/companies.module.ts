import { Module, Logger } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from './../auth/auth.module';


@Module({
  imports: [PrismaModule, AuthModule],
  providers: [CompaniesService, PrismaService, Logger],
  controllers: [CompaniesController]
})
export class CompaniesModule { }
