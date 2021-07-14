import { PaginationType } from '../../../utils/generate-include';

export interface OptionalQueryProperties<X, Y> extends PaginationType<X, Y> {
  include?: string;
}

export interface OptionalQueryProperty {
  include?: string;
}
