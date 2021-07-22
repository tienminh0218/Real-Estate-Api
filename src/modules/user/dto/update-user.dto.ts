import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import {
  IsString,
  IsOptional,
  MaxLength,
  MinLength,
  Matches,
  IsEnum,
} from 'class-validator';

export class UpdateUserDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  @MinLength(4)
  @MaxLength(30)
  fullName?: string;

  @ApiProperty({ required: false })
  @IsEnum(Role)
  @IsOptional()
  role?: Role;

  @ApiProperty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password to weak',
  })
  @IsOptional()
  password?: string;
}
