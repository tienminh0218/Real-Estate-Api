import { Field, ObjectType, Int, InputType } from '@nestjs/graphql';

@ObjectType()
export class PaginationType {
  @Field()
  page?: number;

  @Field()
  limit?: number;

  @Field()
  totalRows?: number;
}

@InputType()
export class PaginationInput {
  @Field((type) => Int, { nullable: true })
  limit?: number | string;

  @Field((type) => Int, { nullable: true })
  page?: number | string;
}
