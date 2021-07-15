import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBrokerDto {
  @IsString()
  @IsNotEmpty()
  district: string;

  @IsString()
  @IsNotEmpty()
  city: string;
}
