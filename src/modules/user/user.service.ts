import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';

import { CreateUserDto } from './dto/create-user.dto';
import { OptionalQueryUsers } from './types/optional-query.type';
import { UserCustom } from './types/user.type';
import { UserRepository } from './repositories/user.repository';
import { FindOneDto, FindManyDto, UpdateByIdDto } from './dto/repository.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly logger: Logger,
  ) {}

  async findUserById(where: Prisma.UserWhereUniqueInput): Promise<User> {
    try {
      const { password, ...data } =
        (await this.userRepository.findById(where)) || {};
      return data as User;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error.message);
    }
  }

  async findUsers(
    params: FindManyDto,
    optional: OptionalQueryUsers = {},
  ): Promise<UserCustom> {
    try {
      const { data, pagination } = await this.userRepository.findMany(
        params,
        optional,
      );
      data.forEach((user) => {
        delete user.password;
      });

      return { data, pagination };
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error.message);
    }
  }

  async createUser(data: CreateUserDto): Promise<any> {
    try {
      return this.userRepository.create(data);
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error.message);
    }
  }

  async updateUser(params: UpdateByIdDto): Promise<User> {
    try {
      return this.userRepository.updateById(params);
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error.message);
    }
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput) {
    try {
      const result = await this.userRepository.deleteById(where);
      return result;
    } catch (error) {
      this.logger.error(error);
      if (error.code === 'P2025') {
        throw new BadRequestException('User not found');
      }
      throw new BadRequestException(error.message);
    }
  }
}
