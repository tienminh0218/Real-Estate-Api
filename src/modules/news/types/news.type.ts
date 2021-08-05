import { News } from '@prisma/client';
import { Field, ObjectType } from '@nestjs/graphql';

import { PaginationType } from '../../../common/types/pagination.type';
import { News as NewsGraphType } from './graph-model.type';

@ObjectType()
export class NewsCustom {
  @Field((type) => [NewsGraphType])
  news: News[];

  @Field((type) => PaginationType)
  pagination: PaginationType;
}
