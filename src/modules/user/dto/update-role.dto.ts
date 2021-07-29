import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

import { IsEnum, IsNotEmpty } from 'class-validator';
import { Role } from '../../auth/decorators/roles.decorator';

@InputType()
export class UpdateRoleUser {
  @ApiProperty()
  @IsEnum(Role, { message: 'Incorrect Role' })
  @IsNotEmpty()
  @Field((type) => Role)
  role?: Role;
}
