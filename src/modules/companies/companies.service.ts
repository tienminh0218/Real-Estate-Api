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
  // async createCompany(cookies: any, data: CreateCompanyDto): Promise<any> {
  //   try {
  //     const decode = await this.checkToken(cookies);
  //     console.log(decode);
  //     const { companyName, district, city } = data;
  //     const existCompanyName = await this.company({ companyName })
  //     if (existCompanyName) throw new Error('companyName already exist');

  //     return this.prisma.company.create({
  //       data: {
  //         companyName,
  //         district,
  //         city,
  //         user: { connect: { id: decode.id } },
  //       },
  //       include: {
  //         user: true,
  //       },
  //     });
  //   } catch (error) {
  //     this.logger.error(`${error.message}`);
  //     throw new BadRequestException(error.message);

  //   };
  // }

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

  async checkToken(token: any) {
    const secret = process.env.JWT_SECRET;
    try {
      const decode = await this.jwtService.verify(token, { secret: secret });

      // console.log(decode);
      return decode;
    } catch (err) {
      throw new UnauthorizedException('Unauthorized');
    }
  }
}