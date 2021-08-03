import { PaginationInput, PaginationType } from '../../../common/types/pagination.type'

export interface OptionalQueryCompanies extends PaginationInput {
  include?: string;
}

export interface OptionalQueryCompany {
  include?: string;
}
