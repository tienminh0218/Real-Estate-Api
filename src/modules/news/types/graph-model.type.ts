import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Broker } from '../../broker/types/graph-model.type';

@ObjectType()
export class News {
  @Field((type) => ID)
  id: string;

  @Field()
  createdAt: string;

  @Field()
  updatedAt: string;

  @Field()
  title: string;

  @Field()
  content: string;

  @Field((type) => Broker)
  author: Broker;
}
