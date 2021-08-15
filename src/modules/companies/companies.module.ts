import { Module, Logger } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from './../auth/auth.module';
import { CompaniesResolver } from './companies.resolver';
import { CompanyRepository } from './repositories/companies.repository';


@Module({
  imports: [PrismaModule, AuthModule],
  providers: [CompaniesService, CompanyRepository, PrismaService, Logger, CompaniesResolver],
  controllers: [CompaniesController]
})
export class CompaniesModule { }
