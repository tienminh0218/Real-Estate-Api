import { AuthService } from './../auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { getJwtConfig } from '../../../config/config.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request.cookies.Authentication;
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
