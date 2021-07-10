import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('get-all')
  @HttpCode(200)
  async getUsers(): Promise<User[]> {
    return await this.userService.users({});
  }

  @Get(':id')
  @HttpCode(200)
  async getUserById(@Param('id') id: string): Promise<User> {
    return await this.userService.user({ id });
  }

  @Post()
  @HttpCode(201)
  async createUser(@Body() payload: CreateUserDto): Promise<User> {
    return this.userService.createUser(payload);
  }

  @Put(':id')
  @HttpCode(204)
  async updateUserById(
    @Param('id') id: string,
    @Body() payload: UpdateUserDto,
  ): Promise<User> {
    return await this.userService.updateUser({ where: { id }, data: payload });
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteUserById(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<any> {
    const result = await this.userService.deleteUser({ id });
    if (result) return res.json({});
  }
}
