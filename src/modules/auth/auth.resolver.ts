import { UnauthorizedException } from '@nestjs/common';
import { Response } from 'express';
import { Args, Mutation, Resolver, Context } from '@nestjs/graphql';
import { ConfigService } from '@nestjs/config';

import { LoginDto, LoginEd } from './types/index';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';

@Resolver((of) => LoginEd)
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Mutation(() => LoginEd)
  @Public()
  async login(@Args('inputLogin') data: LoginDto, @Context() context) {
    const res: Response = context.res;

    const { username, password } = data;
    const user = await this.authService.validateUser(username, password);
    if (!user) throw new UnauthorizedException();

    const { token, user: userLogin } = this.authService.login(user);

    res.cookie(this.configService.get<string>('COOKIE_NAME'), token, {
      // httpOnly: true,
      // secure: true,
      maxAge: this.configService.get<number>('MAX_AGE') * 1000, /// 24h
    });

    return { token, user: userLogin };
  }
}
