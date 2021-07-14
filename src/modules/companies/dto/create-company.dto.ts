import { IsString, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  @MinLength(4)
  @MaxLength(40)
  companyName: string;

  @IsString()
  @MinLength(4)
  @MaxLength(30)
  district: string;

  @IsString()
  @MinLength(4)
  @MaxLength(30)
  city: string;
}
