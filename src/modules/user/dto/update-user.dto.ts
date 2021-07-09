import {
  IsString,
  IsOptional,
  MaxLength,
  MinLength,
  IsNumber,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @MinLength(4)
  @MaxLength(30)
  fullName?: string;

  @IsNumber()
  @IsOptional()
  role?: number;
}
