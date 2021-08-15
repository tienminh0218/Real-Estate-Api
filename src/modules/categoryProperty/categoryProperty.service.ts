import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Prisma, categoryProperty } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
// import { CreateCompanyDto } from './dto/create-company.dto';
import { CreateCategoryPropertyDto } from './dto/create-categoryProperty.dto';
import { FindManyDto } from './dto/repository.dto';
import { CategoryPropertyRepository } from './repositories/categoryProperty.repository';
import { categoryPropertyCustom } from './types/category.type';
import { OptionalQueryCategories } from './types/optional-query.type';

@Injectable()
export class CategoryPropertyService {
  constructor(private logger: Logger, private categoryPropertyRepository: CategoryPropertyRepository) { }

  async categoryProperty(
    categoryPropertyWhereUniqueInput: Prisma.categoryPropertyWhereUniqueInput,
  ): Promise<categoryProperty | null> {
    try {
      return await this.categoryPropertyRepository.findOne(categoryPropertyWhereUniqueInput);
    } catch (error) {
      this.logger.error(`${error.message}`);
      throw new BadRequestException(error.message);
    }
  }

  // async getCategoryById(
  //   categoryPropertyWhereUniqueInput: Prisma.categoryPropertyWhereUniqueInput,
  // ): Promise<categoryProperty | null> {
  //   try {
  //     const existCategory = await this.prisma.categoryProperty.findUnique({
  //       where: categoryPropertyWhereUniqueInput,
  //     });

  //     if (!existCategory) throw new Error('Category not found');
  //     return this.prisma.categoryProperty.findUnique({
  //       where: categoryPropertyWhereUniqueInput,
  //     });
  //   } catch (error) {
  //     this.logger.error(`${error.message}`);
  //     throw new BadRequestException(error.message);
  //   }
  // }

  async getAllCategory(
    params: FindManyDto,
    optional: OptionalQueryCategories = {}
  ): Promise<categoryPropertyCustom> {
    try {
      const { data, pagination } = await this.categoryPropertyRepository.findMany(
        params,
        optional,
      );
      return { data, pagination };
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async createCategoryProperty(data: CreateCategoryPropertyDto): Promise<any> {
    try {
      return await this.categoryPropertyRepository.create(data);
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
      return await this.categoryPropertyRepository.update(params);
    } catch (error) {
      this.logger.error(`${error.message}`);
      throw new BadRequestException(error.message);
    }
  }

  async deleteCategory(
    where: Prisma.categoryPropertyWhereUniqueInput,
  ): Promise<categoryProperty> {
    return this.categoryPropertyRepository.delete(where);
  }
}
