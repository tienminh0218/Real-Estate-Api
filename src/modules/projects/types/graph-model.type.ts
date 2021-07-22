import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Broker } from '../../broker/types/graph-model.type';
import { Company } from '../../companies/types/graph-model.type';
import { Property } from '../../property/types/graph-model.type';
import { Comment_Project } from '../../comment/types/graph-model.type';

@ObjectType()
export class Project {
  @Field((type) => ID)
  id: string;

  @Field()
  createdAt: string;

  @Field()
  updatedAt: string;

  @Field()
  projectName: string;

  @Field()
  district: string;

  @Field()
  city: string;

  @Field((type) => [Property])
  properties: Property[];

  @Field((type) => [Comment_Project])
  comments_project: Comment_Project[];

  @Field((type) => Company)
  company: Company;

  @Field((type) => Broker)
  brokers: Broker;
}
