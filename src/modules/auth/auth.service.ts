import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from './../user/user.service';
import { comparePassword } from '../../utils/hash-password';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly logger: Logger,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    try {
      const user = await this.userService.user({ where: { username } });
      if (user && comparePassword(password, user.password)) return user;

      return null;
    } catch (error) {
      this.logger.error(`${error.message}`);
      return null;
    }
  }

  login(user: any) {
    const { username, fullName, id } = user;
    const token = this.getCookieWithJwtToken(username, id);

    return { token, user: { username, id, fullName } };
  }

  async register(data: CreateUserDto): Promise<any> {
    try {
      const user = await this.userService.createUser(data);

      return this.login(user);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async validateJwt({ username }) {
    try {
      const user = await this.userService.user({
        where: { username },
        include: {
          companies: {
            include: { projects: { include: { properties: true } } },
          },
          broker: true,
        },
      });

      if (!user) return null;

      return user;
    } catch (error) {
      this.logger.error(error.message);
      return null;
    }
  }

  getCookieWithJwtToken(username: string, id: string): string {
    const payload = { username, id };
    const token = this.jwtService.sign(payload);

    return token;
  }
}
