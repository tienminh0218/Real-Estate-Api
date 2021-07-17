import { Response } from 'express';
import { UserService } from './../user/user.service';
import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { comparePassword } from '../../utils/hash-password';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { getJwtConfig } from '../../config/config.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly logger: Logger,
    private readonly jwtService: JwtService,
  ) { }

  async validateUser(username: string, password: string): Promise<any> {
    try {
      const user = await this.userService.user({ username });

      if (user && comparePassword(password, user.password)) return user;

      return null;
    } catch (error) {
      this.logger.error(`${error.message}`);
      return null;
    }
  }

  async login(user: User, res: Response): Promise<any> {
    const { username, id } = user;
    const cookies = await this.getCookieWithJwtToken(username, id, res);
    return { cookies, user };
  }

  async register(data: CreateUserDto, res: Response): Promise<any> {
    try {
      const user = await this.userService.createUser(data);

      return this.login(user, res);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async logout(res: Response) {
    res.clearCookie(process.env.COOKIE_NAME).send('Logout successfully!!!');
  }

  async validateJwt({ username }) {
    try {
      const user = await this.userService.user({ username });

      if (!user) return null;

      return user;
    } catch (error) {
      this.logger.error(error.message);
      return null;
    }
  }

  async getCookieWithJwtToken(
    username: string,
    id: string,
    res: Response,
  ): Promise<void> {
    const payload = { username, id };
    const cookieName = process.env.COOKIE_NAME;
    const token = this.jwtService.sign(payload);

    const {
      signOptions: { expiresIn },
    } = getJwtConfig;

    res
      .cookie(cookieName, token, {
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24), //24h
      })
      .send({ Authentication: token, httpOnly: true, expires: expiresIn });
  }
}
