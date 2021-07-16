import { Role } from '@prisma/client';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class UpdateRoleUser {
  @IsEnum(Role, { message: 'Incorrect Role' })
  @IsNotEmpty()
  role?: Role;
}
