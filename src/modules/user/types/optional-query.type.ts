import { PaginationType } from '../../../utils/generate-include';

export interface OptionalQueryUsers<X, Y> extends PaginationType<X, Y> {
  include?: string;
}

export interface OptionalQueryUser {
  include?: string;
}
