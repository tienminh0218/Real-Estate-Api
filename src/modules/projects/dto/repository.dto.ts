import { Prisma } from '@prisma/client';
import { CreateProjectDto } from './create-project.dto';


export interface FindManyDto {
  where?: Prisma.ProjectWhereInput;
  skip?: number;
  take?: number;
  orderBy?: Prisma.ProjectOrderByInput;
  include?: Prisma.ProjectInclude;
}

export interface UpdateByIdDto {
  where: Prisma.ProjectWhereUniqueInput;
  data: CreateProjectDto;
}
