import { Broker } from '@prisma/client';
import { Field, ObjectType } from '@nestjs/graphql';

import { PaginationType } from '../../../common/types/pagination.type';
import { Broker as BrokerGraphType } from './graph-model.type';

@ObjectType()
export class BrokerCustom {
  @Field((type) => [BrokerGraphType])
  brokers: Broker[];

  @Field((type) => PaginationType)
  pagination: PaginationType;
}
