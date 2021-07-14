import { ProjectsService } from './../projects/projects.service';
import { UserService } from './../user/user.service';
import { Module, Logger } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { PropertyController } from './property.controller';
import { PropertyService } from './property.service';

@Module({
  imports: [PrismaModule],
  controllers: [PropertyController],
  providers: [PropertyService, Logger, UserService, ProjectsService],
})
export class PropertyModule {}
