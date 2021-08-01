import { PaginationInput } from '../../../common/types/pagination.type';

export class OptionalQueryUsers extends PaginationInput {
  include?: string;
}

export class OptionalQueryUser {
  include?: string;
}
