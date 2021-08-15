import { Prisma } from '@prisma/client';
import { CreateCategoryPropertyDto } from './create-categoryProperty.dto';



export interface FindManyDto {
  where?: Prisma.categoryPropertyWhereInput;
  skip?: number;
  take?: number;
  orderBy?: Prisma.categoryPropertyOrderByInput;
  include?: Prisma.categoryPropertyInclude;
}

export interface UpdateByIdDto {
  where: Prisma.categoryPropertyWhereUniqueInput;
  data: CreateCategoryPropertyDto;
}
