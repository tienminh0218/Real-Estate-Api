import { Field, ID, ObjectType, GraphQLISODateTime } from '@nestjs/graphql';

import { Project } from '../../projects/types/graph-model.type';
import { Comment_Company } from '../../comment/types/graph-model.type';

@ObjectType()
export class Company {
  @Field((type) => ID)
  id: string;

  @Field((type) => GraphQLISODateTime)
  createdAt: Date;

  @Field((type) => GraphQLISODateTime)
  updatedAt: Date;

  @Field()
  userId: string;

  @Field()
  companyName: string;

  @Field()
  district: string;

  @Field()
  city: string;

  @Field((type) => [Comment_Company])
  comments_Company: Comment_Company[];

  @Field((type) => [Project], { nullable: 'itemsAndList' })
  projects: Project[];
}
