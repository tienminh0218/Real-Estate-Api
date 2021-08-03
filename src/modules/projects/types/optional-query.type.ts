import { PaginationInput } from '../../../common/types/pagination.type'

export interface OptionalQueryProjects extends PaginationInput {
  include?: string;
}

export interface OptionalQueryProject {
  include?: string;
}
