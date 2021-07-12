import { ProjectsService } from './projects.service';
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import {
  Project as ProjectModel,
  Company as CompanyModel,
} from '@prisma/client';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get('infoComp/:id')
  async infoCom(@Param('id') id: string): Promise<CompanyModel> {
    return this.projectsService.info_comp(id);
  }

  // @Post('createCom')
  // async createcom(@Body() dataComp: CompanyModel): Promise <CompanyModel>{
  //     return this.projectsService.createComp(dataComp);
  // }
  // @Post('createPro')
  // async createpro(@Body() dataPro: ProjectModel): Promise <ProjectModel>{
  //     return this.projectsService.createProj(dataPro);
  // }
  @Get('listProject/:id')
  async list_project(@Param('id') id: string): Promise<ProjectModel[]> {
    return this.projectsService.list_project(id);
  }
  @Get('listProjectCity/:city')
  async listProjectCity(@Param('city') city: string): Promise<ProjectModel[]> {
    return this.projectsService.list_project_city(city);
  }
}
