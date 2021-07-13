import { PaginationType } from '../../../utils/optional-query';

export interface IncludePropertyType<X, Y> extends PaginationType<X, Y> {
  category?: string;
  comments_Property?: string;
  broker?: string;
  user?: string;
}
