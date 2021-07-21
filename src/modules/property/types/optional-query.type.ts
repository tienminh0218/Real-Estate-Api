import { PaginationType } from '../../../utils/generate-include';
import { Prisma } from '@prisma/client';

export interface OptionalQueryProperties
  extends PaginationType<
    Prisma.PropertyWhereUniqueInput,
    Prisma.PropertyOrderByInput
  > {
  include?: string;
}

export interface OptionalQueryProperty {
  include?: string;
}
