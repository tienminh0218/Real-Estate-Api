import { Field, ID, ObjectType, GraphQLISODateTime } from '@nestjs/graphql';

import { Broker } from '../../broker/types/graph-model.type';

@ObjectType()
export class News {
  @Field((type) => ID)
  id: string;

  @Field((type) => GraphQLISODateTime)
  createdAt: string;

  @Field((type) => GraphQLISODateTime)
  updatedAt: string;

  @Field()
  title: string;

  @Field()
  content: string;

  @Field((type) => Broker)
  author: Broker;
}
