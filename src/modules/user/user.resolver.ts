import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '@prisma/client';
import { UseGuards } from '@nestjs/common';

import { UserService } from './user.service';
import { User as UserGraphType } from './types/graph-model.type';
import { CreateUserDto } from './dto/create-user.dto';
import { Public } from '../auth/decorators/public.decorator';
import { UserCustom } from './types/user.type';
import { UpdateUserDto } from './dto/update-user.dto';
import { RolesGuard } from '../auth/guards/role';
import { Role, Roles } from '../auth/decorators/roles.decorator';
import { IsUser } from '../auth/guards/isUser';
import {
  Method,
  Methods,
  Paths,
} from '../auth/decorators/method-graph.decorator';
import { PaginationInput } from '../../common/types/pagination.type';
import { UpdateRoleUser } from './dto/update-role.dto';
@Resolver((of) => UserGraphType)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => UserCustom)
  @Public()
  async getUsers(
    @Args('pagination') pagination: PaginationInput = {},
  ): Promise<UserCustom> {
    return this.userService.users({}, pagination);
  }

  @Query(() => UserGraphType)
  @Public()
  async getUserById(@Args('id') id: string): Promise<User> {
    return await this.userService.user({ where: { id } });
  }

  @Mutation(() => UserGraphType)
  @Public()
  createUser(@Args('inputData') payload: CreateUserDto): Promise<User> {
    return this.userService.createUser(payload);
  }

  @Mutation(() => UserGraphType)
  @Method(Methods.PUT, Paths.USER)
  @UseGuards(IsUser)
  updateUserById(
    @Args('id') id: string,
    @Args('inputData') payload: UpdateUserDto,
  ): Promise<User> {
    const { fullName, password } = payload;
    return this.userService.updateUser({
      where: { id },
      data: { fullName, password },
    });
  }

  @Mutation(() => UserGraphType)
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  updateRole(@Args('id') id: string, @Args('payload') payload: UpdateRoleUser) {
    return this.userService.updateUser({
      where: { id },
      data: payload,
    });
  }

  @Query(() => String)
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  deleteUserById(@Args('id') id: string) {
    const result = this.userService.deleteUser({ id });
    if (result) return 'Delete success';
  }
}
