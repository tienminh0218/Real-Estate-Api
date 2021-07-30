import { categoryProperty } from '@prisma/client';
import { PaginationType } from '../../../common/types/pagination.type';

export class categoryPropertyCustom {
  data: categoryProperty[];
  pagination: PaginationType;
}
