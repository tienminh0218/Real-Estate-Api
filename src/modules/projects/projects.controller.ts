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
} from '@nestjs/common';
import {
  Project as ProjectModel,
  Company as CompanyModel,
} from '@prisma/client';
import { CreateProjectDto } from './dto/create-project.dto';
import { JwtAuthGuard } from '../auth/guards/jwt';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) { }

  @Post(':id')
  @UseGuards(JwtAuthGuard, IsUser)
  async createProject(
    @Body() data: CreateProjectDto,
    @Param('id') id: string,
  ): Promise<any> {

    return this.projectsService.createProject(data, id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, IsUser)
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
  @UseGuards(JwtAuthGuard)
  async deleteProject(@Param('id') id: string): Promise<ProjectModel> {
    return this.projectsService.deleteProject({ id });
  }

  @Get('infoComp/:id')
  async infoCom(@Param('id') id: string): Promise<CompanyModel> {
    return this.projectsService.infoComp(id);
  }

  @Get('listProject/:id')
  async listProject(@Param('id') id: string): Promise<ProjectModel[]> {
    return this.projectsService.listProject(id);
  }

  @Get('listProjectCity/:city')
  async listProjectCity(@Param('city') city: string): Promise<ProjectModel[]> {
    return this.projectsService.listProjectCity(city);
  }

  @Get()
  async getAllProject(): Promise<ProjectModel[]> {
    return await this.projectsService.projects({});
  }
  @Get(':id')
  async getProject(@Param('id') id: string): Promise<ProjectModel> {
    return await this.projectsService.project({ id });
  }
}
