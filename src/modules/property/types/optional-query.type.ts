import { PaginationType } from '../../../common/types/pagination.type';

export interface OptionalQueryProperties extends PaginationType {
  include?: string;
}

export interface OptionalQueryProperty {
  include?: string;
}
