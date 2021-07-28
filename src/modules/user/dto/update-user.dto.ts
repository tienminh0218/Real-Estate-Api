import { Field, InputType } from '@nestjs/graphql';
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

@InputType()
export class UpdateUserDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  @MinLength(4)
  @MaxLength(30)
  @Field({ nullable: true })
  fullName?: string;

  @ApiProperty({ required: false })
  @IsEnum(Role)
  @IsOptional()
  @Field({ nullable: true })
  role?: Role;

  @ApiProperty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password to weak',
  })
  @IsOptional()
  @Field({ nullable: true })
  password?: string;
}
