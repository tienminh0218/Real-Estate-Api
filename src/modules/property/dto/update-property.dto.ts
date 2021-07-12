import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class UpdatePropertyDto {
  @IsOptional()
  @IsString()
  @MinLength(4)
  location?: string;

  @IsOptional()
  @IsString()
  @MinLength(4)
  coordinates?: string;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  price?: number;

  @IsOptional()
  @IsNumber()
  status?: number;
}
