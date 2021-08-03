
import {
    Args,
    Context,
    Int,
    Mutation,
    Query,
    ResolveField,
    Resolver,
} from '@nestjs/graphql';
import { RequestWithUser } from '../auth/interface/requestWithUser';
import { Public } from '../auth/decorators/public.decorator';
import { IsUser } from '../auth/guards/isUser';
import { Patch, UseGuards } from '@nestjs/common';
import { Method, Methods, Paths } from '../auth/decorators/method-graph.decorator';
import { PaginationInput } from 'src/common/types/pagination.type';
import { CategoryProperty as CategoryPropertyType } from './types/graph-model.type';
import { CategoryPropertyService } from './categoryProperty.service';
import { categoryPropertyCustom } from './types/category.type';
import { categoryProperty as categoryPropertyModel } from '@prisma/client';
import { CreateCategoryPropertyDto } from './dto/create-categoryProperty.dto';

@Resolver((of) => CategoryPropertyType)
export class CategoryPropertyResolver {
    constructor(private readonly categoryPropertyService: CategoryPropertyService) { }

    @Query(returns => categoryPropertyCustom)
    @Public()
    async getAllCategory(
        @Args('pagination') pagination: PaginationInput
    ): Promise<categoryPropertyCustom> {
        return await this.categoryPropertyService.getAllCategory({}, pagination);
    }

    @Query(returns => CategoryPropertyType)
    @Public()
    async getCategoryById(
        @Args('id', { type: () => String }) id: string,
    ): Promise<categoryPropertyModel> {
        return await this.categoryPropertyService.getCategoryById({ id });
    }

    @Mutation(returns => CategoryPropertyType)
    @Method(Methods.POST, Paths.PROJECT)
    @Public()
    async createCategoryProperty(
        @Args('input') input: CreateCategoryPropertyDto,
    ): Promise<categoryPropertyModel> {
        return await this.categoryPropertyService.createCategoryProperty(input);
    }

    @Mutation(returns => CategoryPropertyType)
    @Method(Methods.POST, Paths.PROJECT)
    @UseGuards(IsUser)
    async updateCategory(
        @Args('id') id: string,
        @Args('inputData') inputData: CreateCategoryPropertyDto,
    ): Promise<categoryPropertyModel> {
        return await this.categoryPropertyService.updateCategory({
            where: { id },
            data: inputData,
        });
    }

    @Mutation(returns => CategoryPropertyType)
    @Method(Methods.DELETE, Paths.PROJECT)
    @UseGuards(IsUser)
    async deleteCategory(@Args('id') id: string) {
        return this.categoryPropertyService.deleteCategory({ id });
    }
}
