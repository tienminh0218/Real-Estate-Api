import { PaginationType } from '../../../common/types/pagination.type'

export interface OptionalQueryProjects extends PaginationType {
  include?: string;
}

export interface OptionalQueryProject {
  include?: string;
}
