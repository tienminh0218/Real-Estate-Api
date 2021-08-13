import { Prisma } from '@prisma/client';

import { UpdateUserDto } from './update-user.dto';

export interface FindOneDto {
  where?: Prisma.UserWhereInput;
  include?: Prisma.UserInclude;
}

export interface FindManyDto {
  where?: Prisma.UserWhereInput;
  skip?: number;
  take?: number;
  orderBy?: Prisma.UserOrderByInput;
  include?: Prisma.UserInclude;
}

export interface UpdateByIdDto {
  where: Prisma.UserWhereUniqueInput;
  data: UpdateUserDto;
}
