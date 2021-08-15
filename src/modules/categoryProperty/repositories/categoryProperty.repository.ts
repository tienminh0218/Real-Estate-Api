import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Prisma, categoryProperty } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateCategoryPropertyDto } from '../dto/create-categoryProperty.dto';
import { FindManyDto } from '../dto/repository.dto';
import { categoryPropertyCustom } from '../types/category.type';
import { OptionalQueryCategories } from '../types/optional-query.type';


@Injectable()
export class CategoryPropertyRepository {
    constructor(private logger: Logger, private prisma: PrismaService) { }

    async findOne(
        categoryPropertyWhereUniqueInput: Prisma.categoryPropertyWhereUniqueInput,
    ): Promise<categoryProperty | null> {
        const existCategory = await this.prisma.categoryProperty.findUnique({
            where: categoryPropertyWhereUniqueInput,
        });
        return existCategory;
    }

    // async findById(
    //     categoryPropertyWhereUniqueInput: Prisma.categoryPropertyWhereUniqueInput,
    // ): Promise<categoryProperty | null> {
    //     const existCategory = await this.prisma.categoryProperty.findUnique({
    //         where: categoryPropertyWhereUniqueInput,
    //     });

    //     if (!existCategory) throw new Error('Category not found');
    //     return this.prisma.categoryProperty.findUnique({
    //         where: categoryPropertyWhereUniqueInput,
    //     });
    // }

    async findMany(
        params: FindManyDto,
        optional: OptionalQueryCategories = {}
    ): Promise<categoryPropertyCustom> {
        const { where, orderBy } = params;
        let { page, limit, include: includeQuery } = optional;

        page = Number(page) || 1;
        limit = Number(limit) || 20;
        const data = await this.prisma.categoryProperty.findMany({
            take: limit,
            skip: limit * (page - 1),
            where,
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

    async create(data: CreateCategoryPropertyDto): Promise<any> {
        const { nameCategory } = data;
        const existNameCategory = await this.findOne({ nameCategory });
        if (existNameCategory) throw new Error('NameCategory already exist');
        return this.prisma.categoryProperty.create({
            data: {
                nameCategory,
            },
        });
    }

    async update(params: {
        where: Prisma.categoryPropertyWhereUniqueInput;
        data: Prisma.categoryPropertyUpdateInput;
    }): Promise<categoryProperty> {
        const { data, where } = params;
        const existNameCategory = await this.findOne(where);
        if (!existNameCategory) throw new Error('NameCategory already exist');
        return this.prisma.categoryProperty.update({
            data,
            where,
        });
    }

    async delete(
        where: Prisma.categoryPropertyWhereUniqueInput,
    ): Promise<categoryProperty> {
        return this.prisma.categoryProperty.delete({
            where,
        });
    }
}
