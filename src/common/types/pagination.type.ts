import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PaginationType {
  @Field()
  page?: number;
  @Field()
  limit?: number;
  @Field()
  totalRows?: number;
}
