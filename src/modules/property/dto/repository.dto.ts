import { Prisma } from '@prisma/client';

import { UpdatePropertyDto } from './update-property.dto';

export interface FindOneDto {
  where?: Prisma.PropertyWhereInput;
  include?: Prisma.PropertyInclude;
}

export interface FindManyDto {
  where?: Prisma.PropertyWhereInput;
  skip?: number;
  take?: number;
  orderBy?: Prisma.PropertyOrderByInput;
  include?: Prisma.PropertyInclude;
}

export interface UpdateByIdDto {
  where: Prisma.PropertyWhereUniqueInput;
  data: UpdatePropertyDto;
}
