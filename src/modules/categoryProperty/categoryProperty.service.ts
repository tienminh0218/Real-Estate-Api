import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Prisma, categoryProperty } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
// import { CreateCompanyDto } from './dto/create-company.dto';
import { CreateCategoryPropertyDto } from './dto/create-categoryProperty.dto';

@Injectable()
export class CategoryPropertyService {
    constructor(private logger: Logger, private prisma: PrismaService) { }

    async categoryProperty(categoryPropertyWhereUniqueInput: Prisma.categoryPropertyWhereUniqueInput): Promise<categoryProperty | null> {
        try {
            const existCategory = await this.prisma.categoryProperty.findUnique({
                where: categoryPropertyWhereUniqueInput,
            });

            if (existCategory) throw new Error('Category not found');
            return existCategory;
        } catch (error) {
            this.logger.error(`${error.message}`);
            throw new BadRequestException(error.message);
        }
    }

    async getCategoryById(categoryPropertyWhereUniqueInput: Prisma.categoryPropertyWhereUniqueInput): Promise<categoryProperty | null> {
        try {
            const existCategory = await this.prisma.categoryProperty.findUnique({
                where: categoryPropertyWhereUniqueInput,
            })

            if (!existCategory) throw new Error('Category not found');
            return this.prisma.categoryProperty.findUnique({
                where: categoryPropertyWhereUniqueInput,
            });
        } catch (error) {
            this.logger.error(`${error.message}`);
            throw new BadRequestException(error.message);
        }
    }

    getAllCategory(): Promise<categoryProperty[]> {
        return this.prisma.categoryProperty.findMany();
    } t

    async createCategoryProperty(data: CreateCategoryPropertyDto, id: string): Promise<any> {
        try {
            const { nameCategory } = data;
            const existNameCategory = await this.categoryProperty({ nameCategory });
            if (existNameCategory) throw new Error('NameCategory already exist');
            return this.prisma.categoryProperty.create({
                data: {
                    nameCategory,
                    user: { connect: { id: id } },
                },
                include: {
                    user: true,
                },
            });
        } catch (error) {
            this.logger.error(`${error.message}`);
            throw new BadRequestException(error.message);
        }
    }

    async updateCategory(params: {
        where: Prisma.categoryPropertyWhereUniqueInput;
        data: Prisma.categoryPropertyUpdateInput;
    }): Promise<categoryProperty> {
        try {
            const { data, where } = params;
            const existNameCategory = await this.getCategoryById(where);
            if (!existNameCategory) throw new Error('NameCategory already exist');
            return this.prisma.categoryProperty.update({
                data,
                where,
            });

        } catch (error) {
            this.logger.error(`${error.message}`);
            throw new BadRequestException(error.message);
        }
    }

    async deleteCategory(where: Prisma.categoryPropertyWhereUniqueInput): Promise<categoryProperty> {
        return this.prisma.categoryProperty.delete({
            where,
        })
    }




}
