import { Field, ObjectType } from '@nestjs/graphql';
import { Company } from '@prisma/client';
import { PaginationType } from '../../../common/types/pagination.type';
import { Company as Companygraphql } from './graph-model.type';

@ObjectType()
export class CompanyCustom {
  @Field((type) => [Companygraphql])
  data: Company[];
  @Field((type) => PaginationType)
  pagination: PaginationType;
}
