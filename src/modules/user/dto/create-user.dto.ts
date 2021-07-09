import {
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  IsAlphanumeric,
} from 'class-validator';

export class CreateUserDto {
  @IsAlphanumeric()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password to weak',
  })
  password: string;

  @IsString()
  @MinLength(4)
  @MaxLength(30)
  fullName?: string;

  @IsNumber()
  @IsOptional()
  role?: number;
}
