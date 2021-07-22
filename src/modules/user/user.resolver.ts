import { UserService } from './user.service';
import {
  Args,
  Int,
  Mutation,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { User } from '@prisma/client';

import { User as UserType } from './types/graph-model.type';
import { CreateUserDto } from './dto/create-user.dto';
import { UserInterface } from '../auth/interface/requestWithUser';
@Resolver((of) => UserType)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [UserType])
  async getUsers(): Promise<User[]> {
    return;
  }

  @Query(() => UserType)
  async getUserById(
    @Args('id', { type: () => String }) id: string,
  ): Promise<User> {
    return await this.userService.user({ where: { id } });
  }

  @Mutation(() => UserType)
  async createUser(@Args('payload') payload: CreateUserDto): Promise<User> {
    return await this.userService.createUser(payload);
  }

  @ResolveField(() => UserType)
  async relationShip(
    @Args('payload') payload: string,
  ): Promise<UserInterface | any> {}
}
