import { Comment_Broker } from './../../comment/types/graph-model.type';
import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';

import { User } from '../../user/types/graph-model.type';
import { Property } from '../../property/types/graph-model.type';
import { News } from '../../news/types/graph-model.type';
import { Project } from '../../projects/types/graph-model.type';

@ObjectType()
export class Broker {
  @Field((type) => ID)
  id: string;

  @Field((type) => GraphQLISODateTime)
  createdAt: Date;

  @Field((type) => GraphQLISODateTime)
  updatedAt: Date;

  @Field((type) => User)
  user: User;

  @Field()
  district: string;

  @Field()
  city: string;

  @Field()
  phoneNumber: string;

  @Field()
  dob: string;

  @Field()
  email: string;

  @Field((type) => [Property])
  properties: Property[];

  @Field((type) => [News])
  news: News[];

  @Field((type) => [Comment_Broker])
  comments_Broker: Comment_Broker;

  @Field((type) => Project)
  Project: Project;
}
