
import {
    Args,
    Context,
    Int,
    Mutation,
    Query,
    ResolveField,
    Resolver,
} from '@nestjs/graphql';
import { Project as ProjectType } from './types/graph-model.type';
import { Company as CompanyType } from '../companies/types/graph-model.type';
import { Project as ProjectModel, Company as CompanyModel } from '.prisma/client';
import { RequestWithUser } from '../auth/interface/requestWithUser';
import { Public } from '../auth/decorators/public.decorator';
import { IsUser } from '../auth/guards/isUser';
import { Patch, UseGuards } from '@nestjs/common';
import { Method, Methods, Paths } from '../auth/decorators/method-graph.decorator';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectCustom } from './types/project.type';
import { PaginationInput } from 'src/common/types/pagination.type';
import { IsBroker } from '../auth/guards/isBroker';

@Resolver((of) => ProjectType)
export class ProjectsResolver {
    constructor(private readonly projectService: ProjectsService) { }

    @Query(returns => ProjectCustom)
    @Public()
    async getProjectOfCompany(
        @Args('id') id: string,
        @Args('pagination') pagination: PaginationInput
    ): Promise<ProjectCustom> {
        return await this.projectService.projects(id, {}, pagination);
    }

    @Query(returns => ProjectType)
    @Public()
    async getProjectById(
        @Args('id', { type: () => String }) id: string,
    ): Promise<ProjectModel> {
        return await this.projectService.project({ id });
    }

    @Mutation(returns => ProjectType)
    @Method(Methods.POST, Paths.PROJECT)
    @UseGuards(IsUser)
    async createProject(
        @Args('input') input: CreateProjectDto,
        @Args('id') id: string,
    ): Promise<ProjectModel> {
        return await this.projectService.createProject(input, id);
    }

    @Mutation(returns => ProjectType)
    @Method(Methods.POST, Paths.PROJECT)
    @UseGuards(IsUser)
    async updateProject(
        @Args('id') id: string,
        @Args('inputData') inputData: CreateProjectDto,
    ): Promise<ProjectModel> {
        return await this.projectService.updateProject({
            where: { id },
            data: inputData,
        });
    }

    @Mutation(returns => ProjectType)
    @Method(Methods.DELETE, Paths.PROJECT)
    @UseGuards(IsUser)
    async deleteProject(@Args('id') id: string) {
        return this.projectService.deleteProject({ id });
    }

    @Query(returns => CompanyType)
    @Public()
    async infoCompany(
        @Args('id', { type: () => String }) id: string,
    ): Promise<CompanyModel> {
        return await this.projectService.infoComp({ id });
    }

    @Query(returns => ProjectCustom)
    @Public()
    async listProjectCity(
        @Args('city') city: string,
        @Args('pagination') pagination: PaginationInput
    ): Promise<ProjectCustom> {
        return await this.projectService.listProjectCity(city, {}, pagination);
    }
}
