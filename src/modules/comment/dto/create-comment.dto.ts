import { ApiProperty } from '@nestjs/swagger';
import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateCommentDto {
  @Field()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  content: string;
}
