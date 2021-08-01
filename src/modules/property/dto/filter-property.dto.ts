import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

import { OptionalQueryProperties } from '../types/optional-query.type';

enum OrderBy {
  asc = 'asc',
  desc = 'desc',
}

registerEnumType(OrderBy, {
  name: 'OrderBy',
});

@InputType()
export class FilterQuery extends OptionalQueryProperties {
  @ApiProperty()
  @Field({ nullable: true })
  filterPrice?: string;

  @ApiProperty()
  @Field({ nullable: true })
  city?: string;

  @Field((type) => OrderBy, { nullable: true })
  orderBy?: OrderBy;
}
