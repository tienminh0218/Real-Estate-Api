import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  MinLength,
} from 'class-validator';

export class CreatePropertyDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  categoryId: string;

  @ApiProperty()
  @IsString()
  @MinLength(4)
  name: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber(undefined, { message: 'Latitude must be a number' })
  @Min(-90, { message: 'Latitude must greater than or equal to -90' })
  @Max(90, { message: 'Latitude must less than or equal to 90' })
  lat: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber(undefined, { message: 'Longitude must be a number' })
  @Min(-180, { message: 'Longitude must greater than or equal to -180' })
  @Max(180, { message: 'Longitude must less than or equal to -180' })
  lng: number;
}
