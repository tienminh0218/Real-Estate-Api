import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';

import { IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';

@InputType()
export class LoginDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  username: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  password: string;
}

@InputType()
export class RegisterDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  username: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password to weak',
  })
  password: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  fullName?: string;
}

@ObjectType()
export class UserLoginResult {
  @Field()
  username: string;

  @Field((type) => ID)
  id: string;

  @Field({ nullable: true })
  fullName?: string;
}

@ObjectType()
export class AuthGraphType {
  @Field()
  token: string;

  @Field((type) => UserLoginResult)
  user: UserLoginResult;
}
