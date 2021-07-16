import { Response } from 'express';
import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { CreateUserDto } from '../user/dto/create-user.dto';
import { RequestWithUser } from './interface/requestWithUser';
import { LocalAuthGuard } from './guards/local';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Res({ passthrough: true }) res: Response,
    @Req() req: RequestWithUser,
  ): Promise<any> {
    const { token, user } = await this.authService.login(req.user);

    res.cookie(this.configService.get<string>('COOKIE_NAME'), token, {
      httpOnly: true,
      secure: true,
      maxAge: this.configService.get<number>('MAX_AGE') * 1000, /// 24h
    });

    return { user };
  }

  @Post('register')
  async register(@Body() payload: CreateUserDto): Promise<any> {
    const result = await this.authService.register(payload);
    return result;
  }

  @Post('logout')
  @HttpCode(200)
  async logout(@Res() res: Response) {
    return res.clearCookie(this.configService.get<string>('COOKIE_NAME')).end();
  }
}
