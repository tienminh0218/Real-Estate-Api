import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('get-all')
  async getUsers(): Promise<User[]> {
    return await this.userService.users({});
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User> {
    return await this.userService.user({ id });
  }

  @Post()
  async createUser(@Body() payload: CreateUserDto): Promise<User> {
    return this.userService.createUser(payload);
  }

  @Put(':id')
  async updateUserById(
    @Param('id') id: string,
    @Body() payload: UpdateUserDto,
  ): Promise<User> {
    return await this.userService.updateUser({ where: { id }, data: payload });
  }

  @Delete(':id')
  async deleteUserById(@Param('id') id: string, @Res() res): Promise<any> {
    const result = await this.userService.deleteUser({ id });
    if (result)
      return res.json({ statusCode: 204, message: 'Deleted success' });
  }
}
