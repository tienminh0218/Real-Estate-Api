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
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('Companies')
@Controller('companies')
// @UseGuards(JwtAuthGuard)
export class CompaniesController {
  constructor(private companiesService: CompaniesService) { }

  @Get()
  @Public()
  @ApiOkResponse({ description: 'Get all companies' })
  async getCompanies(
    @Query() optional: OptionalQueryCompanies,
  ): Promise<CompanyCustom> {
    return await this.companiesService.companies({}, optional);
  }

  @Get(':id')
  @Public()
  @ApiOkResponse({ description: 'Get company by id' })
  @ApiBadRequestResponse({ description: 'Not found id' })
  async getCompany(@Param('id') id: string): Promise<CompanyModel> {
    return await this.companiesService.company({ id });
  }

  @Post()
  @UseGuards(IsBroker)
  @ApiUnauthorizedResponse({ description: 'User not logged in' })
  @ApiForbiddenResponse({ description: 'Not have role Broker or Admin' })
  @ApiCreatedResponse({
    description: 'The Company has been successfully created',
  })
  @ApiBadRequestResponse({ description: 'Not found relationship' })
  async createCompany(
    @Req() req: RequestWithUser,
    @Body() data: CreateCompanyDto,
  ) {
    return this.companiesService.createCompany(req.user, data);
  }

  @Put(':id')
  @UseGuards(IsUser)
  @ApiBadRequestResponse({ description: 'Not found id' })
  @ApiForbiddenResponse({ description: 'Not have role Broker or Admin' })
  @ApiUnauthorizedResponse({ description: 'User not logged in' })
  @ApiOkResponse({ description: 'Updated success a company' })
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
  @ApiForbiddenResponse({ description: 'Not have role Admin' })
  @ApiUnauthorizedResponse({ description: 'User not logged in' })
  @ApiOkResponse({ description: 'Delete success a company' })
  @ApiBadRequestResponse({ description: 'Not found id' })
  async deleteCompany(@Param('id') id: string): Promise<CompanyModel> {
    return this.companiesService.deleteCompany({ id });
  }
}
