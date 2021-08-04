import {
    Controller,
    Body,
    Get,
    Post,
    Param,
    Delete,
    Put,
    UseGuards,
} from '@nestjs/common';
import { CategoryPropertyService } from './categoryProperty.service';
import { categoryProperty, Company as CompanyModel } from '@prisma/client';
import { CreateCategoryPropertyDto } from './dto/create-categoryProperty.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../auth/guards/jwt';
import { categoryPropertyCustom } from './types/category.type';
import { OptionalQueryCategories } from './types/optional-query.type';
import { Public } from '../auth/decorators/public.decorator';
import { IsUser } from '../auth/guards/isUser';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('CategoryProperty')
@Controller('category')
// @UseGuards(JwtAuthGuard)
export class CategoryPropertyController {
    constructor(
        private categoryPropertyService: CategoryPropertyService
    ) { }

    @Get()
    @Public()
    @ApiOkResponse({ description: 'Get all category' })
    async getAllCategory(@Param() optional: OptionalQueryCategories): Promise<categoryPropertyCustom> {
        return this.categoryPropertyService.getAllCategory({}, optional);
    }

    @Get('/:id')
    @Public()
    @ApiOkResponse({ description: 'Get category by id' })
    @ApiBadRequestResponse({ description: 'Not found id' })
    async getCategoryById(@Param('id') id: string): Promise<categoryProperty> {
        return this.categoryPropertyService.getCategoryById({ id });
    }

    @Post()
    @Public()
    @ApiCreatedResponse({ description: 'The category has been successfully created' })
    async createCategory(@Body() data: CreateCategoryPropertyDto): Promise<any> {
        return this.categoryPropertyService.createCategoryProperty(data);
    }

    @Put(':id')
    @Public()
    @ApiOkResponse({ description: 'Updated success a category' })
    async updateCategoryById(
        @Param('id') id: string,
        @Body() payload: CreateCategoryPropertyDto,
    ): Promise<categoryProperty> {
        return await this.categoryPropertyService.updateCategory({ where: { id }, data: payload });
    }

    @Delete('/:id')
    @Public()
    @ApiOkResponse({ description: 'Delete success a category' })
    @ApiBadRequestResponse({ description: 'Not found id' })
    async deleteCategory(@Param('id') id: string): Promise<categoryProperty> {
        return this.categoryPropertyService.deleteCategory({ id });
    }
}
