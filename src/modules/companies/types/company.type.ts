import { Company } from '@prisma/client';
import { PaginationType } from '../../../common/types/pagination.type';

export class CompanyCustom {
  data: Company[];
  pagination: PaginationType;
}
