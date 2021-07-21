import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Broker {
  @Field()
  id: string;

  @Field()
  createdAt: string;

  @Field()
  updatedAt: string;

  @Field()
  user: string;

  @Field()
  userId: string;

  @Field()
  district: string;

  @Field()
  city: string;

  @Field()
  properties: string;

  @Field()
  news: string;

  @Field()
  comments_Broker: string;

  @Field()
  Project: string;

  @Field()
  projectId: string;
}
