import { IsUser } from './../auth/guards/isUser';
import {
  Controller,
  Body,
  Get,
  Post,
  Param,
  Delete,
  Put,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { Company as CompanyModel } from '@prisma/client';
import { RequestWithUser } from '../auth/interface/requestWithUser';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt';
import { OptionalQueryCompanies } from './types/optional-query.type';
import { CompanyCustom } from './types/company.type';
import { Public } from '../auth/decorators/public.decorator';
import { IsBroker } from '../auth/guards/isBroker';

@Controller('companies')
// @UseGuards(JwtAuthGuard)
export class CompaniesController {
  constructor(private companiesService: CompaniesService) {}

  @Get()
  @Public()
  async getCompanies(
    @Query() optional: OptionalQueryCompanies,
  ): Promise<CompanyCustom> {
    return await this.companiesService.companies({}, optional);
  }

  @Get(':id')
  @Public()
  async getCompany(@Param('id') id: string): Promise<CompanyModel> {
    return await this.companiesService.company({ id });
  }

  @Post()
  @UseGuards(IsBroker)
  async createCompanycookies(
    @Req() req: RequestWithUser,
    @Body() data: CreateCompanyDto,
  ) {
    return this.companiesService.createCompany(req.user, data);
  }

  @Put(':id')
  @UseGuards(IsUser)
  async updateCompanyById(
    @Param('id') id: string,
    @Body() payload: CreateCompanyDto,
  ): Promise<CompanyModel> {
    return await this.companiesService.updateCompany({
      where: { id },
      data: payload,
    });
  }

  @Delete('/:id')
  @UseGuards(IsUser)
  async deleteCompany(@Param('id') id: string): Promise<CompanyModel> {
    return this.companiesService.deleteCompany({ id });
  }
}
