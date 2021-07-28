import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '@prisma/client';

import { PaginationType } from '../../../common/types/pagination.type';
import { User as UserGraphType } from './graph-model.type';

@ObjectType()
export class UserCustom {
  @Field((type) => [UserGraphType])
  data: User[];

  @Field((type) => PaginationType)
  pagination: PaginationType;
}
