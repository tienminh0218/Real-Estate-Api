import { PaginationType } from '../../../utils/optional-query';

export interface IncludeUserType<X, Y> extends PaginationType<X, Y> {
  broker?: string;
  company?: string;
  comments_project?: string;
  comments_Broker?: string;
  comments_Company?: string;
  comments_Property?: string;
  properties?: string;
}
