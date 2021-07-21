import { PaginationType } from './../../../common/types/pagination.type';
import { Property } from '@prisma/client';

export class PropertyCustom {
  data: Property[];
  pagination: PaginationType;
}
