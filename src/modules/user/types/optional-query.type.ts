import { Field, ObjectType } from '@nestjs/graphql';
import { PaginationType } from '../../../common/types/pagination.type';

export class OptionalQueryUsers extends PaginationType {
  include?: string;
}

export class OptionalQueryUser {
  include?: string;
}
