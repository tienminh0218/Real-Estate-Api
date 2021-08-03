import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

@InputType()
export class CreateCategoryPropertyDto {
    @IsString()
    @MinLength(4)
    @MaxLength(40)
    @Field()
    nameCategory: string;
}
