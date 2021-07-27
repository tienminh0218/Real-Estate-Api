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
import { Response } from 'express';
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
import { Roles, Role } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/role';
import { UpdateRoleUser } from './dto/update-role.dto';
import {
  OptionalQueryUser,
  OptionalQueryUsers,
} from './types/optional-query.type';
import { UserCustom } from './types/user.type';
import { Public } from '../auth/decorators/public.decorator';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Public()
  @ApiOkResponse({ description: 'Get all users' })
  async getUsers(
    @Query() optional: OptionalQueryUsers,
  ): Promise<UserCustom | null> {
    return this.userService.users({}, optional);
  }

  @Get(':id')
  @Public()
  @ApiOkResponse({ description: 'Get user by id' })
  async getUserById(
    @Param('id') id: string,
    @Query() optional: OptionalQueryUser,
  ): Promise<User> {
    return this.userService.user({ where: { id } }, optional);
  }

  @Put(':id')
  @ApiCookieAuth('Auth')
  @ApiCreatedResponse({ description: 'Updated success user by id' })
  @ApiForbiddenResponse({ description: 'Incorrect userId' })
  @ApiUnauthorizedResponse({ description: 'User not login' })
  @ApiBadRequestResponse({ description: 'Not found account to update' })
  @UseGuards(IsUser)
  async updateUserById(
    @Param('id') id: string,
    @Body() payload: UpdateUserDto,
  ): Promise<User> {
    const { fullName, password } = payload;
    return this.userService.updateUser({
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
  @UseGuards(RolesGuard)
  async updateRole(
    @Param('id') id: string,
    @Body() payload: UpdateRoleUser,
  ): Promise<User> {
    return this.userService.updateUser({
      where: { id },
      data: payload,
    });
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiForbiddenResponse({ description: 'Not have role Admin' })
  @ApiBadRequestResponse({ description: 'Not found id' })
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  async deleteUserById(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<any> {
    const result = this.userService.deleteUser({ id });
    if (result) return res.json({});
  }
}
