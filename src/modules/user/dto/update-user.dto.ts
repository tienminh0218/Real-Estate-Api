import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @MinLength(4)
  @MaxLength(30)
  fullName?: string;
}
