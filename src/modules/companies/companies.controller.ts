import { Controller, Body, Get, Post, Param, Delete, Put, UseGuards, Req } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { Company as CompanyModel } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('companies')
// @UseGuards(AuthGuard('local'))
export class CompaniesController {
    constructor(
        private companiesService: CompaniesService,
    ) { }

    // @Post()
    // async createCompanycookies(@Req() req: Request, @Body() data: CreateCompanyDto): Promise<any> {
    //     return this.companiesService.createCompany(req.cookies[process.env.COOKIE_NAME], data);
    // }

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
