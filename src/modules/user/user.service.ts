import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';

import { PrismaService } from './../prisma/prisma.service';
import { hashPassword } from '../../utils/hash-password';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { OptionalQueryUsers } from './types/optional-query.type';
import { UserCustom } from './types/user.type';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService, private readonly logger: Logger) {}

  async user(param: {
    where?: Prisma.UserWhereUniqueInput;
    include?: Prisma.UserInclude;
  }): Promise<User | null> {
    try {
      const { where, include } = param;
      const result = await this.prisma.user.findUnique({
        where,
        include: {
          broker: true,
          ...include,
        },
      });
      return result;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error.message);
    }
  }

  async users(
    params: {
      where?: Prisma.UserWhereInput;
      skip?: number;
      take?: number;
      cursor?: Prisma.UserWhereUniqueInput;
      orderBy?: Prisma.UserOrderByInput;
      include?: Prisma.UserInclude;
    },
    optional: OptionalQueryUsers = {},
  ): Promise<UserCustom> {
    try {
      const { where, orderBy, cursor, include } = params;
      let { page, limit } = optional;
      page = Number(page) || 1;
      limit = Number(limit) || 20;

      const data = await this.prisma.user.findMany({
        take: limit,
        skip: limit * (page - 1),
        where,
        orderBy,
        cursor,
        include: {
          broker: true,
          ...include,
        },
      });

      return {
        data,
        pagination: {
          page,
          limit,
          totalRows: data.length,
        },
      };
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error.message);
    }
  }

  async createUser(data: CreateUserDto): Promise<any> {
    try {
      const { username, password: rawPassword, fullName } = data;
      const existedUser = await this.user({ where: { username } });
      if (existedUser) throw new Error('Username already exist');
      const passwordHashed = await hashPassword(rawPassword);

      const result = await this.prisma.user.create({
        data: {
          username,
          password: passwordHashed,
          fullName,
        },
      });
      return result;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error.message);
    }
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: UpdateUserDto;
  }): Promise<User> {
    try {
      const { where, data } = params;
      const existedUser = await this.user({ where: { id: where.id } });
      if (!existedUser) throw new Error('Account Not Found');
      const passwordHashed = await hashPassword(data.password);

      const result = await this.prisma.user.update({
        data: {
          ...data,
          password: passwordHashed,
        },
        where,
      });
      return result;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error.message);
    }
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<any> {
    try {
      const existedUser = await this.user({ where });
      if (!existedUser) throw new Error('Account Not Found');
      await this.prisma.user.delete({
        where,
      });

      return true;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error.message);
    }
  }
}
