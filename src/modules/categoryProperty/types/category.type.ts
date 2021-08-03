import { Field, ObjectType } from '@nestjs/graphql';
import { categoryProperty } from '@prisma/client';
import { PaginationType } from '../../../common/types/pagination.type';
import { CategoryProperty as CategoryPropertygraphql } from './graph-model.type';

@ObjectType()
export class categoryPropertyCustom {
  @Field((type) => [CategoryPropertygraphql])
  data: categoryProperty[];

  @Field((type) => PaginationType)
  pagination: PaginationType;
}
