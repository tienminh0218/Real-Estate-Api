import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Prisma, Company } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCompanyDto } from './dto/create-company.dto';

@Injectable()
export class CompaniesService {
    constructor(
        private logger: Logger,
        private prisma: PrismaService,
    ) { }


    async company(companyWhereUniqueInput: Prisma.CompanyWhereUniqueInput): Promise<Company | null> {
        return this.prisma.company.findUnique({
            where: companyWhereUniqueInput,
        })
    }

    async createCompany(id: string, data: CreateCompanyDto): Promise<any> {
        try {
            const { companyName, district, city } = data;
            const existCompanyName = await this.company({ companyName })
            if (existCompanyName) throw new Error('companyName already exist');

            return this.prisma.company.create({
                data: {
                    companyName,
                    district,
                    city,
                    user: { connect: { id: id } },
                },
                include: {
                    user: true,
                },
            });
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
