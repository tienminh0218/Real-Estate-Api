import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
  Min,
  Max,
} from 'class-validator';

@InputType()
export class AssignBroker {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Field()
  brokerId: string;
}

@InputType()
export class UpdatePropertyDto {
  @Field({ nullable: true })
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @MinLength(4)
  name?: string;

  @Field({ nullable: true })
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  price?: number;

  @Field({ nullable: true })
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  status?: number;

  @Field({ nullable: true })
  @ApiProperty({ required: false })
  @IsOptional()
  userId?: string;

  @Field({ nullable: true })
  @ApiProperty({ required: false })
  @IsOptional()
  categoryId?: string;

  @Field({ nullable: true })
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  address?: string;

  @Field({ nullable: true })
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  ward?: string;

  @Field({ nullable: true })
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  district?: string;

  @Field({ nullable: true })
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  city?: string;

  @Field({ nullable: true })
  @ApiProperty({ required: false })
  @IsNumber(undefined, { message: 'Latitude must be a number' })
  @Min(-90, { message: 'Latitude must greater than or equal to -90' })
  @Max(90, { message: 'Latitude must less than or equal to 90' })
  @IsOptional()
  lat?: number;

  @Field({ nullable: true })
  @ApiProperty({ required: false })
  @IsNumber(undefined, { message: 'Longitude must be a number' })
  @Min(-180, { message: 'Longitude must greater than or equal to -180' })
  @Max(180, { message: 'Longitude must less than or equal to 180' })
  @IsOptional()
  lng?: number;
}
