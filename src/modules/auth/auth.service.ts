import { UserService } from './../user/user.service';
import { Injectable, Logger } from '@nestjs/common';
import { comparePassword } from '../../utils/hash-password';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly logger: Logger,
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

  async login() {}
}
