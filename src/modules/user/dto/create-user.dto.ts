import { Field, InputType } from '@nestjs/graphql';
import {
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  IsAlphanumeric,
} from 'class-validator';
import { Role } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class CreateUserDto {
  @ApiProperty()
  @IsAlphanumeric()
  @MinLength(4)
  @MaxLength(20)
  @Field()
  username: string;

  @ApiProperty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password to weak',
  })
  @Field()
  password: string;

  @ApiProperty({ required: false })
  @IsString()
  @MinLength(4)
  @IsOptional()
  @MaxLength(30)
  @Field({ nullable: true })
  fullName?: string;
}
