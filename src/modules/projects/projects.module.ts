import { Module, Logger } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaModule } from '../prisma/prisma.module';
import { ProjectsResolver } from './projects.resolver';
import { ProjectRepository } from './repositories/projects.repository';
@Module({
  imports: [PrismaModule],
  providers: [ProjectsService, ProjectRepository, PrismaService, Logger, ProjectsResolver],
  controllers: [ProjectsController]
})
export class ProjectsModule { }
