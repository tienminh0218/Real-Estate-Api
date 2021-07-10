import { AuthService } from './auth.service';
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '@prisma/client';
import { RequestWithUser } from './interface/requestWithUser';
import { JwtAuthGuard } from './guard/jwt';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Post('login')
  async login(@Req() req: RequestWithUser, payload): Promise<any> {
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(@Body() payload: CreateUserDto): Promise<User> {
    return await this.authService.register(payload);
  }
}
