import { IsUser } from './../auth/guards/isUser';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Put,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { Response, Request, query } from 'express';
import {
  ApiTags,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiCookieAuth,
  ApiForbiddenResponse,
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';

import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt';
import { Roles, Role } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/role';
import { UpdateRoleUser } from './dto/update-role.dto';
import {
  OptionalQueryUser,
  OptionalQueryUsers,
} from './types/optional-query.type';
import { UserCustom } from './types/user.type';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  @ApiOkResponse({ description: 'Get all users' })
  async getUsers(
    @Query() optional: OptionalQueryUsers,
  ): Promise<UserCustom | null> {
    return await this.userService.users({}, optional);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Get user by id' })
  async getUserById(
    @Param('id') id: string,
    @Query() optional: OptionalQueryUser,
  ): Promise<User> {
    return await this.userService.user({ where: { id } }, optional);
  }

  @Put(':id')
  @ApiCookieAuth('Auth')
  @ApiCreatedResponse({ description: 'Updated success user by id' })
  @ApiForbiddenResponse({ description: 'Incorrect userId' })
  @ApiUnauthorizedResponse({ description: 'User not login' })
  @ApiBadRequestResponse({ description: 'Not found account to update' })
  @UseGuards(JwtAuthGuard, IsUser)
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

  @Patch(':id/role')
  @ApiCreatedResponse({ description: 'Updated success role' })
  @ApiForbiddenResponse({ description: 'Not have role Admin' })
  @ApiUnauthorizedResponse({ description: 'User not login' })
  @ApiBadRequestResponse({
    description: 'Not found account to update or empty input data',
  })
  @Roles(Role.ADMIN)
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
  @ApiForbiddenResponse({ description: 'Not have role Admin' })
  @ApiBadRequestResponse({ description: 'Not found id' })
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async deleteUserById(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<any> {
    const result = await this.userService.deleteUser({ id });
    if (result) return res.json({});
  }
}
