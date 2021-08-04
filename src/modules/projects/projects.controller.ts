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
import { ApiBadRequestResponse, ApiCreatedResponse, ApiForbiddenResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { IsBroker } from '../auth/guards/isBroker';

@ApiTags('Projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) { }

  @Post(':id')
  @UseGuards(IsBroker)
  @ApiUnauthorizedResponse({ description: 'User not logged in' })
  @ApiForbiddenResponse({ description: 'Not have role Broker or Admin' })
  @ApiCreatedResponse({ description: 'Project has been successfully created' })
  async createProject(
    @Body() data: CreateProjectDto,
    @Param('id') id: string,
  ): Promise<any> {
    return this.projectsService.createProject(data, id);
  }

  @Put(':id')
  @UseGuards(IsBroker)
  @ApiUnauthorizedResponse({ description: 'User not logged in' })
  @ApiForbiddenResponse({ description: 'Not have role Broker or Admin' })
  @ApiOkResponse({ description: 'Updated success a project' })
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
  @UseGuards(IsBroker)
  @ApiUnauthorizedResponse({ description: 'User not logged in' })
  @ApiForbiddenResponse({ description: 'Not have role Broker or Admin' })
  @ApiOkResponse({ description: 'Delete success a project' })
  @ApiBadRequestResponse({ description: 'Not found id' })
  async deleteProject(@Param('id') id: string): Promise<ProjectModel> {
    return this.projectsService.deleteProject({ id });
  }

  @Get('infoComp/:id')
  @Public()
  @ApiOkResponse({ description: 'Get info company by id' })
  @ApiBadRequestResponse({ description: 'Not found id' })
  async infoCom(@Param('id') id: string): Promise<CompanyModel> {
    return this.projectsService.infoComp({ id });
  }

  @Get('listProject/:id')
  @Public()
  @ApiOkResponse({ description: 'Get list project of a company by id' })
  @ApiBadRequestResponse({ description: 'Not found id' })
  async listProject(@Query() optional: OptionalQueryProjects, @Param('id') id: string): Promise<ProjectCustom> {
    return this.projectsService.projects(id, {}, optional);
  }

  @Get('listProjectCity/:city')
  @Public()
  @ApiOkResponse({ description: 'Get list project of a company by city or district' })
  @ApiBadRequestResponse({ description: 'Not found city or district' })
  async listProjectCity(@Query() optional: OptionalQueryProjects, @Param('city') city: string): Promise<ProjectCustom> {
    return this.projectsService.listProjectCity(city, {}, optional);
  }

  @Get(':id')
  @Public()
  @ApiOkResponse({ description: 'Get project by id' })
  @ApiBadRequestResponse({ description: 'Not found id' })
  async getProject(@Param('id') id: string): Promise<ProjectModel> {
    return await this.projectsService.project({ id });
  }
}
