import { ApiProperty } from '@nestjs/swagger';
import { InputType, Field } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
@InputType()
export class CreateBrokerDto {
  @Field()
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  district: string;

  @Field()
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  city: string;

  @Field()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(9)
  @MaxLength(11)
  @Matches(/^[0-9]+$$/i, {
    message: '$property must be formatted as number',
  })
  phoneNumber: string;

  @Field()
  @ApiProperty()
  @IsNotEmpty()
  @Matches(
    /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/i,
    {
      message: '$property must be formatted as  dd/mm/yyyy',
    },
  )
  dob: string;

  @Field()
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
