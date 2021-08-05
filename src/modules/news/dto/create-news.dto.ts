import { ApiProperty } from '@nestjs/swagger';
import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateNewsDto {
  @Field()
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @Field()
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  content: string;
}
