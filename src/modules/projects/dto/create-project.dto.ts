import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

@InputType()
export class CreateProjectDto {
  @IsString()
  @MinLength(4)
  @MaxLength(40)
  @Field()
  projectName: string;

  @IsString()
  @MinLength(4)
  @MaxLength(30)
  @Field()
  district: string;

  @IsString()
  @MinLength(4)
  @MaxLength(30)
  @Field()
  city: string;
}
