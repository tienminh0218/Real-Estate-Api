import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Project, Company, Prisma } from '@prisma/client';
import { CreateProjectDto } from './dto/create-project.dto';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService, private readonly logger: Logger) {}

  async project(
    projectWhereUniqueInput: Prisma.ProjectWhereUniqueInput,
  ): Promise<Project | null> {
    return this.prisma.project.findUnique({
      where: projectWhereUniqueInput,
    });
  }

  async projects(params: {
    where?: Prisma.ProjectWhereInput;
    skip?: number;
    take?: number;
    cursor?: Prisma.ProjectWhereUniqueInput;
    orderBy?: Prisma.ProjectOrderByInput;
    include?: Prisma.ProjectInclude;
  }): Promise<Project[]> {
    try {
      const { where, include } = params;

      return this.prisma.project.findMany({
        where,
        include,
      });
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async createProject(data: CreateProjectDto, id: string): Promise<any> {
    try {
      const { projectName, district, city } = data;
      const existProjectName = await this.project({ projectName });
      if (existProjectName) throw new Error('ProjectName already exist');
      return this.prisma.project.create({
        data: {
          projectName,
          district,
          city,
          company: { connect: { id: id } },
        },
        include: {
          company: true,
        },
      });
    } catch (error) {
      this.logger.error(`${error.message}`);
      throw new BadRequestException(error.message);
    }
  }

  async updateProject(params: {
    where: Prisma.ProjectWhereUniqueInput;
    data: Prisma.ProjectUpdateInput;
  }): Promise<Project> {
    try {
      const { data, where } = params;
      const existedProject = await this.project(where);
      if (!existedProject) throw new Error('Project not found');
      return this.prisma.project.update({
        data,
        where,
      });
    } catch (error) {
      this.logger.error(`${error.message}`);
      throw new BadRequestException(error.message);
    }
  }

  async deleteProject(where: Prisma.ProjectWhereUniqueInput): Promise<Project> {
    return this.prisma.project.delete({
      where,
    });
  }

  async infoComp(id: string): Promise<Company | null> {
    return this.prisma.company.findFirst({
      where: { id: id },
    });
  }

  async listProject(id: string): Promise<Project[]> {
    return this.prisma.project.findMany({
      where: {
        companyId: id,
      },
    });
  }

  async listProjectCity(searchcity: string): Promise<Project[]> {
    return this.prisma.project.findMany({
      where: {
        OR: [
          {
            city: { contains: searchcity },
          },
          {
            district: { contains: searchcity },
          },
        ],
      },
    });
  }

  async list_project_city(searchcity: string): Promise<Project[]> {
    return this.prisma.project.findMany({
      where: {
        OR: [
          {
            city: { contains: searchcity },
          },
          {
            district: { contains: searchcity },
          },
        ],
      },
    });
  }

  // async list_project_city(city:string): Promise<Project[]>{
  //     return this.prisma.project.findMany({
  //         where:{
  //             city: city
  //         }
  //     })
  // }
}
