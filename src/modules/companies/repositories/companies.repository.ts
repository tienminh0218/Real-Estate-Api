import { BadRequestException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { Prisma, Company } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateCompanyDto } from '../dto/create-company.dto';
import { FindManyDto, UpdateByIdDto } from '../dto/repository.dto';
import { CompanyCustom } from '../types/company.type';
import { OptionalQueryCompanies } from '../types/optional-query.type';


@Injectable()
export class CompanyRepository {
    constructor(
        private logger: Logger,
        private prisma: PrismaService,
    ) { }


    async findOne(companyWhereUniqueInput: Prisma.CompanyWhereUniqueInput): Promise<Company | null> {
        return this.prisma.company.findUnique({
            where: companyWhereUniqueInput,
        })
    }

    async findMany(
        params: FindManyDto,
        optional: OptionalQueryCompanies = {}
    ): Promise<CompanyCustom> {
        const { where, orderBy, include } = params;
        let { page, limit } = optional;
        page = Number(page) || 1;
        limit = Number(limit) || 20;
        const data = await this.prisma.company.findMany({
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

    async create(user: any, data: CreateCompanyDto) {
        const { companyName, district, city } = data;
        const existCompanyName = await this.findOne({ companyName })
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
    }

    async update(params: UpdateByIdDto): Promise<Company> {
        const { data, where } = params;
        const existedCompany = await this.findOne(where);
        if (!existedCompany) throw new Error('Company not found');
        return this.prisma.company.update({
            data,
            where
        })
    }

    async delete(where: Prisma.CompanyWhereUniqueInput): Promise<Company> {
        return this.prisma.company.delete({
            where
        })
    }
}