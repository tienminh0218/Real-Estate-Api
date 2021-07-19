import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

import { AuthService } from './../auth.service';
import { getJwtConfig } from '../../../config/config.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          console.log(request.cookies);
          console.log(request.cookies.Auth);
          return request.cookies[this.configService.get<string>('COOKIE_NAME')];
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: getJwtConfig.secret,
    });
  }

  async validate(payload: any) {
    const user = await this.authService.validateJwt(payload);
    if (!user) throw new UnauthorizedException();

    return user;
  }
}
