import { Controller, Body, Get, Post, Param, Delete, Put } from '@nestjs/common';
import { CategoryPropertyService } from './categoryProperty.service';
import { categoryProperty } from '@prisma/client';
import { CreateCategoryPropertyDto } from './dto/create-categoryProperty.dto';

@Controller('category')
export class CategoryPropertyController {
    constructor(
        private categoryProService: CategoryPropertyService,
    ) { }

    @Post('/:id')
    async createCategory(@Body() data: CreateCategoryPropertyDto, @Param('id') id: string): Promise<any> {
        return this.categoryProService.createCategoryProperty(data, id);
    }

    @Get()
    getAllCategory(): Promise<categoryProperty[]> {
        return this.categoryProService.getAllCategory();
    }

    @Get('/:id')
    getCategoryById(@Param('id') id: string): Promise<categoryProperty> {
        return this.categoryProService.getCategoryById({ id });
    }
    @Put(':id')
    async updateCategoryById(
        @Param('id') id: string,
        @Body() payload: CreateCategoryPropertyDto,
    ): Promise<categoryProperty> {
        return await this.categoryProService.updateCategory({ where: { id }, data: payload });
    }

    @Delete('/:id')
    async deleteCategory(@Param('id') id: string): Promise<categoryProperty> {
        return this.categoryProService.deleteCategory({ id });
    }


}
