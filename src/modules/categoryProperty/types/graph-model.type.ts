import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CategoryProperty {
  @Field((type) => ID)
  id: string;

  @Field()
  createdAt: string;

  @Field()
  updatedAt: string;

  @Field()
  nameCategory: string;

  //   @Field()
  //   properties: string;
}
