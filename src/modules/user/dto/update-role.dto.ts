import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class UpdateRoleUser {
  @ApiProperty()
  @IsEnum(Role, { message: 'Incorrect Role' })
  @IsNotEmpty()
  role?: Role;
}
