import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
  MinLength,
} from 'class-validator';

@InputType()
export class CreatePropertyDto {
  @Field()
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  categoryId: string;

  @Field()
  @ApiProperty()
  @IsString()
  @MinLength(4)
  name: string;

  @Field()
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @Field()
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  address: string;

  @Field()
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  ward: string;

  @Field()
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  district: string;

  @Field()
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  city: string;

  @Field()
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber(undefined, { message: 'Latitude must be a number' })
  @Min(-90, { message: 'Latitude must greater than or equal to -90' })
  @Max(90, { message: 'Latitude must less than or equal to 90' })
  lat: number;

  @Field()
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber(undefined, { message: 'Longitude must be a number' })
  @Min(-180, { message: 'Longitude must greater than or equal to -180' })
  @Max(180, { message: 'Longitude must less than or equal to 180' })
  lng: number;
}
