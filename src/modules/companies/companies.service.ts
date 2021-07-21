import { BadRequestException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { Prisma, Company } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CompaniesService {
  constructor(
    private logger: Logger,
    private prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) { }


  async company(companyWhereUniqueInput: Prisma.CompanyWhereUniqueInput): Promise<Company | null> {
    return this.prisma.company.findUnique({
      where: companyWhereUniqueInput,
    })
  }

  async companies(params: {
    where?: Prisma.CompanyWhereInput;
    skip?: number;
    take?: number;
    cursor?: Prisma.CompanyWhereUniqueInput;
    orderBy?: Prisma.CompanyOrderByInput;
    include?: Prisma.CompanyInclude;
  }): Promise<Company[]> {
    try {
      const { where, include } = params;

      return this.prisma.company.findMany({
        where,
        include
      });
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }

  async createCompany(user: any, data: CreateCompanyDto) {
    try {
      const { companyName, district, city } = data;
      const existCompanyName = await this.company({ companyName })
      if (existCompanyName) throw new Error('companyName already exist');

      const createComp = this.prisma.company.create({
        data: {
          companyName,
          district,
          city,
          user: { connect: { id: user.id } },
        }
      });
      return createComp;
    } catch (error) {
      this.logger.error(`${error.message}`);
      throw new BadRequestException(error.message);

    };
  }

  async updateCompany(params: {
    where: Prisma.CompanyWhereUniqueInput;
    data: Prisma.CompanyUpdateInput;
  }): Promise<Company> {
    try {
      const { data, where } = params;
      const existedCompany = await this.company(where);
      if (!existedCompany) throw new Error('Company not found');
      return this.prisma.company.update({
        data,
        where
      })
    } catch (error) {
      this.logger.error(`${error.message}`);
      throw new BadRequestException(error.message);
    }

  }

  async deleteCompany(where: Prisma.CompanyWhereUniqueInput): Promise<Company> {
    return this.prisma.company.delete({
      where
    })
  }
}