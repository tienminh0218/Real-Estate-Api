import { Prisma } from '@prisma/client';
import { CreateCompanyDto } from './create-company.dto';

export interface FindManyDto {
  where?: Prisma.CompanyWhereInput;
  skip?: number;
  take?: number;
  orderBy?: Prisma.CompanyOrderByInput;
  include?: Prisma.CompanyInclude;
}

export interface UpdateByIdDto {
  where: Prisma.CompanyWhereUniqueInput;
  data: CreateCompanyDto;
}
