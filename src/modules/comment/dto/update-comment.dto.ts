import { ApiProperty } from '@nestjs/swagger';
import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class UpdateCommentDto {
  @Field()
  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  content: string;
}
