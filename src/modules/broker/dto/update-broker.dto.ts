import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsEmail,
} from 'class-validator';

@InputType()
export class UpdateBrokerDto {
  @Field()
  @ApiProperty()
  @IsString()
  @IsOptional()
  district: string;

  @Field()
  @ApiProperty()
  @IsString()
  @IsOptional()
  city: string;

  @Field()
  @ApiProperty()
  @IsString()
  @IsOptional()
  @MinLength(9)
  @MaxLength(11)
  @Matches(/^[0-9]+$$/i, {
    message: '$property must be formatted as number',
  })
  phoneNumber: string;

  @Field()
  @ApiProperty()
  @IsOptional()
  @Matches(
    /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/i,
    {
      message: '$property must be formatted as  dd/mm/yyyy',
    },
  )
  dob: string;

  @Field()
  @ApiProperty()
  @IsOptional()
  @IsEmail()
  email: string;
}
