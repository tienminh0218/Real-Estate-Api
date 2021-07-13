import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';
import { User } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';
import { IncludeUserType } from '../../utils/optional-query';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('get-all')
  @HttpCode(200)
  async getUsers(@Query() optional): Promise<User[] | null> {
    return await this.userService.users({}, optional);
  }

  @Get(':id')
  @HttpCode(200)
  async getUserById(@Param('id') id: string, @Query() optional): Promise<User> {
    return await this.userService.user({ id }, optional);
  }

  @Put(':id')
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
