import {
  IsEmail,
  IsISO8601,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateBrokerDto {
  @IsString()
  @IsNotEmpty()
  district: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(9)
  @MaxLength(11)
  @Matches(/^[0-9]+$$/i, {
    message: '$property must be formatted as number',
  })
  phoneNumber: string;

  @IsNotEmpty()
  @Matches(
    /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/i,
    {
      message: '$property must be formatted as  dd/mm/yyyy',
    },
  )
  dob: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
