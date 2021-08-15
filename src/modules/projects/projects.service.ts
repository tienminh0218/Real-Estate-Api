import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Project, Company, Prisma } from '@prisma/client';
import { CreateProjectDto } from './dto/create-project.dto';
import { OptionalQueryProjects } from './types/optional-query.type';
import { ProjectCustom } from './types/project.type';
import { ProjectRepository } from './repositories/projects.repository';
import { FindManyDto, UpdateByIdDto } from './dto/repository.dto';
import { CompanyRepository } from '../companies/repositories/companies.repository';
import { identity } from 'rxjs';

@Injectable()
export class ProjectsService {
  constructor(
    private projectRepository: ProjectRepository,
    private companyRepository: CompanyRepository,
    private readonly logger: Logger) { }

  async project(projectWhereUniqueInput: Prisma.ProjectWhereUniqueInput): Promise<Project | null> {
    return this.projectRepository.findOne(projectWhereUniqueInput);
  }

  async projects(
    id: string,
    params: FindManyDto,
    optional: OptionalQueryProjects = {},
  ): Promise<ProjectCustom> {
    try {
      const { data, pagination } = await this.projectRepository.findMany(
        id,
        params,
        optional,
      );
      return { data, pagination };
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async createProject(data: CreateProjectDto, id: string): Promise<any> {
    try {
      return await this.projectRepository.create(data, id);
    } catch (error) {
      this.logger.error(`${error.message}`);
      throw new BadRequestException(error.message);
    }
  }

  async updateProject(params: {
    where: Prisma.ProjectWhereUniqueInput;
    data: CreateProjectDto
  }): Promise<Project> {
    try {
      return await this.projectRepository.update(params);
    } catch (error) {
      this.logger.error(`${error.message}`);
      throw new BadRequestException(error.message);
    }
  }

  async deleteProject(where: Prisma.ProjectWhereUniqueInput): Promise<Project> {
    return this.projectRepository.delete(where);
  }

  async infoComp(where: Prisma.ProjectWhereUniqueInput): Promise<Company | null> {
    return this.companyRepository.findOne(where);
  }

  async listProjectCity(
    searchcity: string,
    params: FindManyDto,
    optional: OptionalQueryProjects,
  ): Promise<ProjectCustom> {
    try {
      const { data, pagination } = await this.projectRepository.listProjectCity(
        searchcity,
        params,
        optional,
      );
      return { data, pagination };
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }
}
