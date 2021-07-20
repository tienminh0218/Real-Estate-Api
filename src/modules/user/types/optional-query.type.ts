import { PaginationType } from '../../../utils/generate-include';
import { Prisma } from '@prisma/client';

export interface OptionalQueryUsers
  extends PaginationType<Prisma.UserWhereUniqueInput, Prisma.UserOrderByInput> {
  include?: string;
}

export interface OptionalQueryUser {
  include?: string;
}
