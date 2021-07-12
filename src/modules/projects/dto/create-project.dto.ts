import { IsString, IsNotEmpty ,MaxLength, MinLength } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @MinLength(4)
  @MaxLength(40)
  projectName: string;

  @IsString()
  @MinLength(4)
  @MaxLength(30)
  district: string;

  @IsString()
  @MinLength(4)
  @MaxLength(30)
  city: string;
}
