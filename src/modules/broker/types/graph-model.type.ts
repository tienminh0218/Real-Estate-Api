import { Field, ID, ObjectType } from '@nestjs/graphql';

import { User } from '../../user/types/graph-model.type';
import { Property } from '../../property/types/graph-model.type';
import { News } from '../../news/types/graph-model.type';
import { Project } from '../../projects/types/graph-model.type';

@ObjectType()
export class Broker {
  @Field((type) => ID)
  id: string;

  @Field()
  createdAt: string;

  @Field()
  updatedAt: string;

  @Field((type) => User)
  user: string;

  @Field()
  district: string;

  @Field()
  city: string;

  @Field((type) => [Property])
  properties: Property[];

  @Field((type) => [News])
  news: News[];

  @Field()
  comments_Broker: string;

  @Field((type) => Project)
  Project: Project;
}
