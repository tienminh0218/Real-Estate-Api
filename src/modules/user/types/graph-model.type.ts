import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field((type) => ID)
  id: string;

  @Field()
  createdAt: string;

  @Field()
  updatedAt: string;

  @Field()
  username: string;

  @Field()
  password: string;

  @Field((type) => Int)
  role: number;

  @Field({ nullable: true })
  fullName?: string;

  //   @Field()
  //   broker:

  //   @Field()
  //   company:

  //   @Field()
  //   comments_project:

  //   @Field()
  //   comments_Broker:

  //   @Field()
  //   comments_Company:

  //   @Field()
  //   comments_Property:

  //   @Field()
  //   properties:
}
