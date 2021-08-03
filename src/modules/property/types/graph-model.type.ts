import {
  Field,
  ObjectType,
  ID,
  Int,
  GraphQLISODateTime,
  Float,
  Directive,
} from '@nestjs/graphql';

import { CategoryProperty } from '../../categoryProperty/types/graph-model.type';
import { User } from '../../user/types/graph-model.type';
import { Broker } from '../../broker/types/graph-model.type';
import { Project } from '../../projects/types/graph-model.type';
import { Comment_Property } from '../../comment/types/graph-model.type';
@ObjectType()
export class Location {
  @Field((type) => ID)
  id: string;

  @Field({ nullable: true })
  type: string;

  @Field((type) => Float)
  lat: number;

  @Field((type) => Float)
  lng: number;

  @Field()
  address: string;

  @Field()
  ward: string;

  @Field()
  district: string;

  @Field()
  city: string;
}

@ObjectType()
export class Property {
  @Field((type) => ID)
  id: string;

  @Field()
  name: string;

  @Field((type) => GraphQLISODateTime)
  createdAt: Date;

  @Field((type) => GraphQLISODateTime)
  updatedAt: Date;

  @Field((type) => Location)
  location: Location;

  @Field((type) => Int)
  price: number;

  @Field((type) => Int)
  status: number;

  @Field((type) => Int)
  status2: number;

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
