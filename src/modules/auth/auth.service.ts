import { UserService } from './../user/user.service';
import { Injectable, Logger } from '@nestjs/common';
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
  ) {}

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

  async login(user: User): Promise<any> {
    const { username, id } = user;

    const cookies = await this.getCookieWithJwtToken(username, id);

    return { cookies, user };
  }

  async register(data: CreateUserDto): Promise<any> {
    try {
      const user = await this.userService.createUser(data);

      return this.login(user);
    } catch (error) {
      this.logger.error(error.message);
    }
  }

  async validateJwt({ username }) {
    try {
      const user = await this.userService.user(username);

      if (!user) return null;

      return user;
    } catch (error) {
      this.logger.error(error.message);
      return null;
    }
  }

  async getCookieWithJwtToken(username: string, id: string): Promise<string> {
    const payload = { username, id };
    const token = this.jwtService.sign(payload);
    const {
      signOptions: { expiresIn },
    } = getJwtConfig;

    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${expiresIn};SameSite=None; Secure`;
  }
}
