import { Module, Logger } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaModule } from '../prisma/prisma.module';
import { ProjectsResolver } from './projects.resolver';
import { ProjectRepository } from './repositories/projects.repository';
import { CompanyRepository } from '../companies/repositories/companies.repository';
@Module({
  imports: [PrismaModule],
  providers: [ProjectsService, ProjectRepository, CompanyRepository, PrismaService, Logger, ProjectsResolver],
  controllers: [ProjectsController],
  exports: [ProjectsService, ProjectRepository]
})
export class ProjectsModule { }
