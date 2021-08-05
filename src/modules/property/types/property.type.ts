import { Property } from '@prisma/client';
import { Field, ObjectType } from '@nestjs/graphql';

import { PaginationType } from './../../../common/types/pagination.type';
import {
  Property as PropertyGraphType,
  PropOfBroker,
} from './graph-model.type';

@ObjectType()
export class PropertyCustom {
  @Field((type) => [PropertyGraphType])
  data: Property[];

  @Field((type) => PaginationType)
  pagination: PaginationType;
}

@ObjectType()
export class PropertiesOfBroker {
  @Field((type) => [PropOfBroker])
  data: Property[];

  @Field((type) => PaginationType)
  pagination: PaginationType;
}
