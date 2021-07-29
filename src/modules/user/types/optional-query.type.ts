import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNumber, IsOptional } from 'class-validator';
import { PaginationType } from '../../../common/types/pagination.type';

export class OptionalQueryUsers extends PaginationType {
  include?: string;
}

export class OptionalQueryUser {
  include?: string;
}

@InputType()
export class GraphQlPagination {
  @Field((type) => Int, { nullable: true })
  limit?: number;

  @Field((type) => Int, { nullable: true })
  page?: number;
}
