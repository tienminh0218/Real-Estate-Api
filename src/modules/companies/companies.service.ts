import { BadRequestException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { Prisma, Company } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { JwtService } from '@nestjs/jwt';
import { OptionalQueryCompanies } from './types/optional-query.type';
import { CompanyCustom } from './types/company.type';
import { CompanyRepository } from './repositories/companies.repository';
import { FindManyDto, UpdateByIdDto } from './dto/repository.dto';

@Injectable()
export class CompaniesService {
  constructor(
    private logger: Logger,
    private readonly companyRepository: CompanyRepository,
  ) { }


  async company(companyWhereUniqueInput: Prisma.CompanyWhereUniqueInput): Promise<Company | null> {
    return this.companyRepository.findOne(companyWhereUniqueInput)
  }

  async companies(
    params: FindManyDto,
    optional: OptionalQueryCompanies = {}
  ): Promise<CompanyCustom> {
    try {
      const { data, pagination } = await this.companyRepository.findMany(
        params,
        optional,
      );
      return { data, pagination };
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async createCompany(user: any, data: CreateCompanyDto) {
    try {
      return await this.companyRepository.create(user, data);
    } catch (error) {
      this.logger.error(`${error.message}`);
      throw new BadRequestException(error.message);
    };
  }

  async updateCompany(params: UpdateByIdDto): Promise<Company> {
    try {
      return await this.companyRepository.update(params);
    } catch (error) {
      this.logger.error(`${error.message}`);
      throw new BadRequestException(error.message);
    }

  }

  async deleteCompany(where: Prisma.CompanyWhereUniqueInput): Promise<Company> {
    return this.companyRepository.delete(where);
  }
}