import {
  IsOptional,
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsEmail,
} from 'class-validator';

export class UpdateBrokerDto {
  @IsString()
  @IsOptional()
  district: string;

  @IsString()
  @IsOptional()
  city: string;

  @IsString()
  @IsOptional()
  @MinLength(9)
  @MaxLength(11)
  @Matches(/^[0-9]+$$/i, {
    message: '$property must be formatted as number',
  })
  phoneNumber: string;

  @IsOptional()
  @Matches(
    /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/i,
    {
      message: '$property must be formatted as  dd/mm/yyyy',
    },
  )
  dob: string;

  @IsOptional()
  @IsEmail()
  email: string;
}
