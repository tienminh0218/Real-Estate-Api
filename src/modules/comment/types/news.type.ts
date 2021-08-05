import { Field, ObjectType } from '@nestjs/graphql';
import {
  Comment_Broker,
  Comment_Company,
  Comment_Project,
  Comment_Property,
} from '@prisma/client';
import { PaginationType } from 'src/common/types/pagination.type';
import {
  Comment_Broker as Comment_BrokerGraphType,
  Comment_Company as Comment_CompanyGraphType,
  Comment_Project as Comment_ProjectGraphType,
  Comment_Property as Comment_PropertyGraphType,
} from './graph-model.type';
@ObjectType()
export class Comment_BrokerCustom {
  @Field((type) => [Comment_BrokerGraphType])
  comment: Comment_Broker[];

  @Field((type) => PaginationType)
  pagination: PaginationType;
}

@ObjectType()
export class Comment_CompanyCustom {
  @Field((type) => [Comment_CompanyGraphType])
  comment: Comment_Company[];

  @Field((type) => PaginationType)
  pagination: PaginationType;
}

@ObjectType()
export class Comment_ProjectCustom {
  @Field((type) => [Comment_ProjectGraphType])
  comment: Comment_Project[];

  @Field((type) => PaginationType)
  pagination: PaginationType;
}

@ObjectType()
export class Comment_PropertyCustom {
  @Field((type) => [Comment_PropertyGraphType])
  comment: Comment_Property[];

  @Field((type) => PaginationType)
  pagination: PaginationType;
}
