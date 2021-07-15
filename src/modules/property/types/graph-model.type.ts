import { Field, ObjectType, ID, Int } from '@nestjs/graphql';

@ObjectType()
export class Property {
  @Field((type) => ID)
  id: string;

  @Field()
  createdAt: string;

  @Field()
  updatedAt: string;

  @Field()
  location: string;

  @Field()
  coordinates: string;

  @Field((type) => Int)
  price: number;

  @Field((type) => Int)
  status: number;

  @Field()
  comments_Property: string;

  @Field()
  brokerId: string;

  @Field()
  userId: string;

  @Field()
  projectId: string;

  @Field()
  categoryId: string;
}
