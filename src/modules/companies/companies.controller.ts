import { Controller, Body, Get, Post, Param, Delete, Put } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { Company as CompanyModel } from '@prisma/client';

@Controller('companies')
export class CompaniesController {
    constructor(
        private companiesService: CompaniesService,
    ) { }

    @Post('/:id')
    async createProject(@Body() data: CreateCompanyDto, @Param('id') id: string): Promise<any> {
        return this.companiesService.createCompany(id, data);
    }

    @Put(':id')
    async updateCompanyById(
        @Param('id') id: string,
        @Body() payload: CreateCompanyDto,
    ): Promise<CompanyModel> {
        return await this.companiesService.updateCompany({ where: { id }, data: payload });
    }

    @Delete('/:id')
    async deleteCompany(@Param('id') id: string): Promise<CompanyModel> {
        return this.companiesService.deleteCompany({ id });
    }


}
