import { PaginationType } from '../../../common/types/pagination.type'

export interface OptionalQueryCompanies extends PaginationType {
  include?: string;
}

export interface OptionalQueryCompany {
  include?: string;
}
