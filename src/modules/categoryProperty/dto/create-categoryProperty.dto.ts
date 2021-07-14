import { IsString, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateCategoryPropertyDto {
    @IsString()
    @MinLength(4)
    @MaxLength(40)
    nameCategory: string;
}
