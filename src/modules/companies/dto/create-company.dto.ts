import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
@InputType()
export class CreateCompanyDto {
  @ApiProperty()
  @IsString()
  @MinLength(4)
  @MaxLength(40)
  @Field()
  companyName: string;

  @ApiProperty()
  @IsString()
  @MinLength(4)
  @MaxLength(30)
  @Field()
  district: string;

  @ApiProperty()
  @IsString()
  @MinLength(4)
  @MaxLength(30)
  @Field()
  city: string;
}
