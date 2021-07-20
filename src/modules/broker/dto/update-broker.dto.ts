import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateBrokerDto {
  @IsString()
  @IsOptional()
  district: string;

  @IsString()
  @IsOptional()
  city: string;
}
