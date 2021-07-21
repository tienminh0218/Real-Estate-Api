import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Company {
  @Field((type) => ID)
  id: string;

  @Field()
  createdAt: string;

  @Field()
  updatedAt: string;

  @Field()
  userId: string;

  @Field()
  companyName: string;

  @Field()
  district: string;

  @Field()
  city: string;

  //   @Field()
  //   comments_Company: string;

  //   @Field()
  //   projects: string;
}
