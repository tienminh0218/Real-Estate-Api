import { Project } from '@prisma/client';
import { PaginationType } from '../../../common/types/pagination.type';

export class ProjectCustom {
  data: Project[];
  pagination: PaginationType;
}
