import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateNewsDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}
