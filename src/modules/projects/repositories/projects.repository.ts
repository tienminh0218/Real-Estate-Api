import { BadRequestException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { Prisma, Company, Project } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateProjectDto } from '../dto/create-project.dto';
import { FindManyDto, UpdateByIdDto } from '../dto/repository.dto';
import { OptionalQueryProjects } from '../types/optional-query.type';
import { ProjectCustom } from '../types/project.type';



@Injectable()
export class ProjectRepository {
    constructor(
        private logger: Logger,
        private prisma: PrismaService,
    ) { }

    async findOne(projectWhereUniqueInput: Prisma.ProjectWhereUniqueInput): Promise<Project | null> {
        return this.prisma.project.findUnique({
            where: projectWhereUniqueInput,
        })
    }

    async findMany(
        id: string,
        params: FindManyDto,
        optional: OptionalQueryProjects,
    ): Promise<ProjectCustom> {
        const { where, orderBy } = params;
        let { page, limit } = optional;
        page = Number(page) || 1;
        limit = Number(limit) || 20;
        const data = await this.prisma.project.findMany({
            where,
            take: limit,
            skip: limit * (page - 1),
            orderBy,
        });
        return {
            data,
            pagination: {
                page,
                limit,
                totalRows: data.length,
            },
        };
    }

    async create(data: CreateProjectDto, id: string): Promise<any> {
        const { projectName, district, city } = data;
        const existProjectName = await this.findOne({ projectName });
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
    }

    async update(params: UpdateByIdDto): Promise<Project> {
        const { data, where } = params;
        const existedProject = await this.findOne(where);
        if (!existedProject) throw new Error('Project not found');
        return this.prisma.project.update({
            data,
            where
        })
    }

    async delete(where: Prisma.ProjectWhereUniqueInput): Promise<Project> {
        return this.prisma.project.delete({
            where
        })
    }

    async infoComp(where: Prisma.ProjectWhereUniqueInput): Promise<Company | null> {
        return this.prisma.company.findFirst({
            where,
        });
    }

    async listProjectCity(
        searchcity: string,
        params: FindManyDto,
        optional: OptionalQueryProjects,
    ): Promise<ProjectCustom> {
        const { where, orderBy } = params;
        let { page, limit } = optional;
        page = Number(page) || 1;
        limit = Number(limit) || 20;
        const data = await this.prisma.project.findMany({
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
            take: limit,
            skip: limit * (page - 1),
            orderBy
        });
        return {
            data,
            pagination: {
                page,
                limit,
                totalRows: data.length,
            },
        };
    }
}