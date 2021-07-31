import { UnauthorizedException } from '@nestjs/common';
import { Response } from 'express';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { ConfigService } from '@nestjs/config';

import { LoginDto, AuthGraphType, RegisterDto } from './types/graph-model.type';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { ResGraph } from './decorators/context';

@Resolver((of) => AuthGraphType)
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Mutation(() => AuthGraphType)
  @Public()
  async login(
    @Args('inputLogin') data: LoginDto,
    @ResGraph() res: Response,
  ): Promise<AuthGraphType> {
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

  @Mutation(() => AuthGraphType)
  @Public()
  async register(
    @Args('inputRegister') payload: RegisterDto,
    @ResGraph() res: Response,
  ): Promise<AuthGraphType> {
    const { token, user } = await this.authService.register(payload);

    res.cookie(this.configService.get<string>('COOKIE_NAME'), token, {
      // httpOnly: true,
      // secure: true,
      maxAge: this.configService.get<number>('MAX_AGE') * 1000, /// 24h
    });

    return { token, user };
  }

  @Query(() => String)
  logout(@ResGraph() res: Response) {
    res.clearCookie(this.configService.get<string>('COOKIE_NAME'));

    return 'Logout Success';
  }
}
