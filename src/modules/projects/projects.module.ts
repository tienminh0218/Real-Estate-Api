import { Module,Logger  } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaModule } from '../prisma/prisma.module';
@Module({
  imports: [PrismaModule],
  providers: [ProjectsService,PrismaService,Logger ],
  controllers: [ProjectsController]
})
export class ProjectsModule {}
