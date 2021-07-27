import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class LoginDto {
  @Field()
  username: string;

  @Field()
  password: string;
}

@ObjectType()
export class UserLogin {
  @Field()
  username: string;

  @Field((type) => ID)
  id: string;

  @Field({ nullable: true })
  fullName?: string;
}

@ObjectType()
export class LoginEd {
  @Field()
  token: string;

  @Field((type) => UserLogin)
  user: UserLogin;
}
