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

@InputType()
export class CreateUserDto {
  @IsAlphanumeric()
  @MinLength(4)
  @MaxLength(20)
  @Field()
  username: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password to weak',
  })
  @Field()
  password: string;

  @IsString()
  @MinLength(4)
  @IsOptional()
  @MaxLength(30)
  @Field({ nullable: true })
  fullName?: string;

  @IsNumber()
  @IsOptional()
  @Field({ nullable: true })
  role?: number;
}
