
import {
    Args,
    Context,
    Int,
    Mutation,
    Query,
    ResolveField,
    Resolver,
} from '@nestjs/graphql';

import { Company as CompanyType } from './types/graph-model.type';
import { CreateCompanyDto } from './dto/create-company.dto';
import { CompaniesService } from './companies.service';
import { Company as CompanyModel } from '@prisma/client';
import { RequestWithUser } from '../auth/interface/requestWithUser';
import { Public } from '../auth/decorators/public.decorator';
import { IsUser } from '../auth/guards/isUser';
import { Patch, UseGuards } from '@nestjs/common';
import { Method, Methods, Paths } from '../auth/decorators/method-graph.decorator';
import { PaginationInput } from 'src/common/types/pagination.type';
import { CompanyCustom } from './types/company.type';
import { IsBroker } from '../auth/guards/isBroker';
import { Role, Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/role';

@Resolver((of) => CompanyType)
export class CompaniesResolver {
    constructor(private readonly companiesService: CompaniesService) { }

    @Query(returns => CompanyCustom)
    @Public()
    async getCompanies(@Args('pagination') pagination: PaginationInput): Promise<CompanyCustom> {
        return await this.companiesService.companies({}, pagination);
    }

    @Query(returns => CompanyType)
    @Public()
    async getCompanyById(
        @Args('id', { type: () => String }) id: string,
    ): Promise<CompanyModel> {
        return await this.companiesService.company({ id });
    }

    @Mutation(returns => CompanyType)
    @Method(Methods.POST, Paths.COMPANY)
    @UseGuards(IsBroker)
    async createCompany(
        @Args('input') input: CreateCompanyDto,
        @Context() context: { req: RequestWithUser },
    ): Promise<CompanyModel> {
        return await this.companiesService.createCompany(context.req.user, input);
    }

    @Mutation(returns => CompanyType)
    @Method(Methods.POST, Paths.COMPANY)
    @UseGuards(IsBroker)
    async updateCompany(
        @Args('id') id: string,
        @Args('inputData') inputData: CreateCompanyDto,
    ): Promise<CompanyModel> {
        return await this.companiesService.updateCompany({
            where: { id },
            data: inputData,
        });
    }

    @Mutation(returns => CompanyType)
    @Method(Methods.DELETE, Paths.COMPANY)
    @UseGuards(IsUser)
    async deleteCompany(@Args('id') id: string) {
        return this.companiesService.deleteCompany({ id });
    }
}
