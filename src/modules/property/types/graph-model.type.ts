import {
  Field,
  ObjectType,
  ID,
  Int,
  GraphQLISODateTime,
} from '@nestjs/graphql';

import { CategoryProperty } from '../../categoryProperty/types/graph-model.type';
import { User } from '../../user/types/graph-model.type';
import { Broker } from '../../broker/types/graph-model.type';
import { Project } from '../../projects/types/graph-model.type';
import { Comment_Property } from '../../comment/types/graph-model.type';
@ObjectType()
export class Property {
  @Field((type) => ID)
  id: string;

  @Field((type) => GraphQLISODateTime)
  createdAt: Date;

  @Field((type) => GraphQLISODateTime)
  updatedAt: Date;

  @Field()
  location: string;

  @Field()
  coordinates: string;

  @Field((type) => Int)
  price: number;

  @Field((type) => Int)
  status: number;

  @Field((type) => [Comment_Property])
  comments_Property: Comment_Property[];

  @Field((type) => Broker)
  broker: Broker;

  @Field((type) => User)
  user: User;

  @Field((type) => Project)
  project: Project;

  @Field((type) => CategoryProperty)
  category: CategoryProperty;
}
