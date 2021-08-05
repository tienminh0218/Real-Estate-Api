import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
@InputType()
export class UpdateNewsDto {
  @Field()
  @ApiProperty()
  @IsString()
  @IsOptional()
  title: string;

  @Field()
  @ApiProperty()
  @IsString()
  @IsOptional()
  content: string;
}
