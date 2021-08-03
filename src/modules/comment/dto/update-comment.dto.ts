import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateCommentDto {
  @IsNotEmpty()
  @IsOptional()
  content: string;
}
