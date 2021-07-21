import { User } from '@prisma/client';
import { PaginationType } from '../../../common/types/pagination.type';

export class UserCustom {
  data: User[];
  pagination: PaginationType;
}
