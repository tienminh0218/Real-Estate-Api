import {PaginationType} from '../../../common/types/pagination.type'

export interface OptionalQueryUsers extends PaginationType {
  include?: string;
}

export interface OptionalQueryUser {
  include?: string;
}
