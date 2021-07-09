import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  // : Promise<User[]>
  @Get()
  async getUsers() {
    console.log('1');
    return '1';
    // return await this.userService.users({});
  }

  @Post()
  async createUser(@Body() payload: CreateUserDto): Promise<User> {
    const { username, password, fullName } = payload;
    return this.userService.createUser({ username, password, fullName });
  }
}
