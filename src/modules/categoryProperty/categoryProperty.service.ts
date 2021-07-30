import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Prisma, categoryProperty } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
// import { CreateCompanyDto } from './dto/create-company.dto';
import { CreateCategoryPropertyDto } from './dto/create-categoryProperty.dto';
import { categoryPropertyCustom } from './types/category.type';
import { OptionalQueryCategories } from './types/optional-query.type';

@Injectable()
export class CategoryPropertyService {
  constructor(private logger: Logger, private prisma: PrismaService) { }

  async categoryProperty(
    categoryPropertyWhereUniqueInput: Prisma.categoryPropertyWhereUniqueInput,
  ): Promise<categoryProperty | null> {
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

  async getCategoryById(
    categoryPropertyWhereUniqueInput: Prisma.categoryPropertyWhereUniqueInput,
  ): Promise<categoryProperty | null> {
    try {
      const existCategory = await this.prisma.categoryProperty.findUnique({
        where: categoryPropertyWhereUniqueInput,
      });

      if (!existCategory) throw new Error('Category not found');
      return this.prisma.categoryProperty.findUnique({
        where: categoryPropertyWhereUniqueInput,
      });
    } catch (error) {
      this.logger.error(`${error.message}`);
      throw new BadRequestException(error.message);
    }
  }

  async getAllCategory(
    params: {
      where?: Prisma.CompanyWhereInput;
      skip?: number;
      take?: number;
      cursor?: Prisma.CompanyWhereUniqueInput;
      orderBy?: Prisma.CompanyOrderByInput;
      include?: Prisma.CompanyInclude;
    },
    optional: OptionalQueryCategories = {}
  ): Promise<categoryPropertyCustom> {
    try {
      const { where, orderBy, cursor } = params;
      let { page, limit, include: includeQuery } = optional;

      page = Number(page) || 1;
      limit = Number(limit) || 20;
      const data = await this.prisma.categoryProperty.findMany({
        take: limit,
        skip: limit * (page - 1),
        where,
        orderBy,
        cursor
      });
      return {
        data,
        pagination: {
          page,
          limit,
          totalRows: data.length,
        },
      };
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async createCategoryProperty(data: CreateCategoryPropertyDto): Promise<any> {
    try {
      const { nameCategory } = data;
      const existNameCategory = await this.categoryProperty({ nameCategory });
      if (existNameCategory) throw new Error('NameCategory already exist');
      return this.prisma.categoryProperty.create({
        data: {
          nameCategory,
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

  async deleteCategory(
    where: Prisma.categoryPropertyWhereUniqueInput,
  ): Promise<categoryProperty> {
    return this.prisma.categoryProperty.delete({
      where,
    });
  }
}
