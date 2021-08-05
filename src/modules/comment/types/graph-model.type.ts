import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';

import { User } from '../../user/types/graph-model.type';
import { Broker } from '../../broker/types/graph-model.type';
import { Company } from '../../companies/types/graph-model.type';
import { Property } from '../../property/types/graph-model.type';
import { Project } from '../../projects/types/graph-model.type';

@ObjectType()
export class Comment_Broker {
  @Field((type) => ID)
  id: string;

  @Field((type) => GraphQLISODateTime)
  createdAt: string;

  @Field((type) => GraphQLISODateTime)
  updatedAt: string;

  @Field()
  content: string;

  @Field((type) => User)
  user: User;

  @Field((type) => Broker)
  broker: Broker;
}

@ObjectType()
export class Comment_Company {
  @Field((type) => ID)
  id: string;

  @Field((type) => GraphQLISODateTime)
  createdAt: string;

  @Field((type) => GraphQLISODateTime)
  updatedAt: string;

  @Field()
  content: string;

  @Field((type) => User)
  user: User;

  @Field((type) => Company)
  company: Company;
}

@ObjectType()
export class Comment_Property {
  @Field((type) => ID)
  id: string;

  @Field((type) => GraphQLISODateTime)
  createdAt: string;

  @Field((type) => GraphQLISODateTime)
  updatedAt: string;

  @Field()
  content: string;

  @Field((type) => User)
  user: User;

  @Field((type) => Property)
  property: Property;
}

@ObjectType()
export class Comment_Project {
  @Field((type) => ID)
  id: string;

  @Field((type) => GraphQLISODateTime)
  createdAt: string;

  @Field((type) => GraphQLISODateTime)
  updatedAt: string;

  @Field()
  content: string;

  @Field((type) => User)
  user: User;

  @Field((type) => Project)
  project: Project;
}
