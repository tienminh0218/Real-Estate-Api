import { IsUser } from './../auth/guards/isUser';
import { ProjectsService } from './projects.service';
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import {
  Project as ProjectModel,
  Company as CompanyModel,
} from '@prisma/client';
import { CreateProjectDto } from './dto/create-project.dto';
import { JwtAuthGuard } from '../auth/guards/jwt';
import { ProjectCustom } from './types/project.type';
import { OptionalQueryProjects } from './types/optional-query.type';
import { Public } from '../auth/decorators/public.decorator';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) { }

  @Post(':id')
  @UseGuards(IsUser)
  async createProject(
    @Body() data: CreateProjectDto,
    @Param('id') id: string,
  ): Promise<any> {
    return this.projectsService.createProject(data, id);
  }

  @Put(':id')
  @UseGuards(IsUser)
  async updateProjectById(
    @Param('id') id: string,
    @Body() payload: CreateProjectDto,
  ): Promise<ProjectModel> {
    return await this.projectsService.updateProject({
      where: { id },
      data: payload,
    });
  }

  @Delete('/:id')
  @UseGuards(IsUser)
  async deleteProject(@Param('id') id: string): Promise<ProjectModel> {
    return this.projectsService.deleteProject({ id });
  }

  @Get('infoComp/:id')
  @Public()
  async infoCom(@Param('id') id: string): Promise<CompanyModel> {
    return this.projectsService.infoComp({ id });
  }

  @Get('listProject/:id')
  @Public()
  async listProject(@Query() optional: OptionalQueryProjects, @Param('id') id: string): Promise<ProjectCustom> {
    return this.projectsService.projects(id, {}, optional);
  }

  @Get('listProjectCity/:city')
  @Public()
  async listProjectCity(@Query() optional: OptionalQueryProjects, @Param('city') city: string): Promise<ProjectCustom> {
    return this.projectsService.listProjectCity(city, {}, optional);
  }

  @Get(':id')
  @Public()
  async getProject(@Param('id') id: string): Promise<ProjectModel> {
    return await this.projectsService.project({ id });
  }
}
