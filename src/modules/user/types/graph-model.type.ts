import {
  Field,
  GraphQLISODateTime,
  ID,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';

import { Company } from '../../companies/types/graph-model.type';
import { Broker } from '../../broker/types/graph-model.type';
import { Role } from '../../auth/decorators/roles.decorator';
import { Property } from '../../property/types/graph-model.type';
import {
  Comment_Broker,
  Comment_Company,
  Comment_Property,
  Comment_Project,
} from '../../comment/types/graph-model.type';

registerEnumType(Role, {
  name: 'Role',
});

@ObjectType()
export class User {
  @Field((type) => ID)
  id: string;

  @Field((type) => GraphQLISODateTime)
  createdAt: Date;

  @Field((type) => GraphQLISODateTime)
  updatedAt: Date;

  @Field()
  username: string;

  @Field()
  password: string;

  @Field((type) => Role, { nullable: true })
  role: Role;

  @Field({ nullable: true })
  fullName?: string;

  @Field((type) => Broker, { nullable: true })
  broker: Broker;

  @Field((type) => [Company], { nullable: 'items' })
  companies: Company[];

  @Field((type) => [Comment_Project], { nullable: 'items' })
  comments_project: Comment_Project[];

  @Field((type) => [Comment_Broker], { nullable: 'items' })
  comments_Broker: Comment_Broker[];

  @Field((type) => [Comment_Company], { nullable: 'items' })
  comments_Company: Comment_Company[];

  @Field((type) => [Comment_Property], { nullable: 'items' })
  comments_Property: Comment_Property[];

  @Field((type) => [Property], { nullable: 'items' })
  properties: Property[];
}
