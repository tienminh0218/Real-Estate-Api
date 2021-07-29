import { Args, Mutation, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { User } from '@prisma/client';
import { UseGuards } from '@nestjs/common';

import { UserService } from './user.service';
import { User as UserGraphType } from './types/graph-model.type';
import { CreateUserDto } from './dto/create-user.dto';
import { Public } from '../auth/decorators/public.decorator';
import { UserCustom } from './types/user.type';
import { UpdateUserDto } from './dto/update-user.dto';
import { RolesGuard } from '../auth/guards/role';
import { Role } from '../auth/decorators/roles.decorator';
import { IsUser } from '../auth/guards/isUser';
import {
  Method,
  Methods,
  Paths,
} from '../auth/decorators/method-graph.decorator';
import { OptionalQueryUser } from './types/optional-query.type';

@Resolver((of) => UserGraphType)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => UserCustom)
  // @Public()
  async getUsers(): Promise<UserCustom> {
    return this.userService.users({});
  }

  @Query(() => UserGraphType)
  @Public()
  async getUserById(
    @Args('id', { type: () => String }) id: string,
  ): Promise<User> {
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
    return this.userService.updateUser({
      where: { id },
      data: payload,
    });
  }
}
