import {
  IsString,
  IsOptional,
  MaxLength,
  MinLength,
  IsNumber,
  Matches,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @MinLength(4)
  @MaxLength(30)
  fullName?: string;

  @IsNumber()
  @IsOptional()
  role?: number;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password to weak',
  })
  @IsOptional()
  password?: string;
}
