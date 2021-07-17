import { UserIsUserGuard } from './../auth/guards/isUser';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Put,
  Query,
  Res,
  Req,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { Response, Request } from 'express';

import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt';
import { Roles, RoleType } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/role';
import { UpdateRoleUser } from './dto/update-role.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers(@Query() optional): Promise<User[] | null> {
    return await this.userService.users({}, optional);
  }

  @Get(':id')
  async getUserById(@Param('id') id: string, @Query() optional): Promise<User> {
    return await this.userService.user({ id }, optional);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, UserIsUserGuard)
  async updateUserById(
    @Param('id') id: string,
    @Body() payload: UpdateUserDto,
  ): Promise<User> {
    const { fullName, password } = payload;
    return await this.userService.updateUser({
      where: { id },
      data: { fullName, password },
    });
  }

  @Put(':id/role')
  @Roles(RoleType.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateRole(
    @Param('id') id: string,
    @Body() payload: UpdateRoleUser,
  ): Promise<User> {
    return await this.userService.updateUser({
      where: { id },
      data: payload,
    });
  }

  @Delete(':id')
  @HttpCode(204)
  @Roles(RoleType.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async deleteUserById(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<any> {
    const result = await this.userService.deleteUser({ id });
    if (result) return res.json({});
  }
}
