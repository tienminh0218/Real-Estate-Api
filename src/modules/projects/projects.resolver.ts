
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
import { Project as ProjectModel } from '.prisma/client';
import { RequestWithUser } from '../auth/interface/requestWithUser';
import { Public } from '../auth/decorators/public.decorator';
import { IsUser } from '../auth/guards/isUser';
import { Patch, UseGuards } from '@nestjs/common';
import { Method, Methods, Paths } from '../auth/decorators/method-graph.decorator';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';

@Resolver((of) => ProjectType)
export class ProjectsResolver {
    constructor(private readonly projectService: ProjectsService) { }

    @Query(returns => [ProjectType])
    @Public()
    async getProjects(): Promise<ProjectModel[]> {
        return;
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
}
