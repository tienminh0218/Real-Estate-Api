
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

@Resolver((of) => CompanyType)
export class CompaniesResolver {
    constructor(private readonly companiesService: CompaniesService) { }

    @Query(returns => [CompanyType])
    async getCompanies(): Promise<CompanyModel[]> {
        return;
    }

    @Query(returns => CompanyType)
    async getCompanyById(
        @Args('id', { type: () => String }) id: string,
    ): Promise<CompanyModel> {
        return await this.companiesService.company({ id });
    }

    @Mutation(returns => CompanyType)
    async createCompany(
        @Args('input') input: CreateCompanyDto,
        @Context() context: { req: RequestWithUser },
    ): Promise<CompanyModel> {
        return await this.companiesService.createCompany(context.req.user, input);
    }

    @Mutation(returns => CompanyType)
    async deleteCompany(@Args('id') id: string) {
        return this.companiesService.deleteCompany({ id });
    }
}
