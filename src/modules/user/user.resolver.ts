import { UserService } from './user.service';
import {
  Args,
  Int,
  Mutation,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { User as UserType } from './types/graph-model.type';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';

@Resolver((of) => UserType)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [UserType])
  async getUsers(): Promise<User[]> {
    return await this.userService.users({});
  }

  @Query(() => UserType)
  async getUserById(
    @Args('id', { type: () => String }) id: string,
  ): Promise<User> {
    return await this.userService.user({ id });
  }

  @Mutation(() => UserType)
  async createUser(@Args('inputUser') payload: CreateUserDto): Promise<User> {
    return await this.userService.createUser(payload);
  }
}
