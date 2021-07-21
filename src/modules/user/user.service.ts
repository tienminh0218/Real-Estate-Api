import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';

import { PrismaService } from './../prisma/prisma.service';
import { hashPassword } from '../../utils/hash-password';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { generateIncludeQuery } from '../../utils/generate-include';
import {
  OptionalQueryUsers,
  OptionalQueryUser,
} from './types/optional-query.type';
import { UserCustom } from './types/user.type';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService, private readonly logger: Logger) {}

  getIncludeUser(listIncludeQuery: string[]) {
    if (!listIncludeQuery) return;

    const listRelation = [
      'broker',
      'companies',
      'comments_project',
      'comments_Broker',
      'comments_Company',
      'comments_Property',
      'properties',
    ];

    return generateIncludeQuery(listRelation, listIncludeQuery);
  }

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
    optional: OptionalQueryUser = {},
  ): Promise<User | null> {
    try {
      const include = this.getIncludeUser(optional?.include?.split(','));

      return this.prisma.user.findUnique({
        where: userWhereUniqueInput,
        include,
      });
    } catch (error) {
      this.logger.error(error.message);
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
      const { where, orderBy, cursor } = params;
      let { page, limit, include: includeQuery } = optional;
      page = Number(page) || 1;
      limit = Number(limit) || 20;
      const include =
        params.include || this.getIncludeUser(includeQuery?.split(','));

      const data = await this.prisma.user.findMany({
        take: limit,
        skip: limit * (page - 1),
        where,
        orderBy,
        cursor,
        include,
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
      this.logger.error(error.message);
      throw new BadRequestException(error.message);
    }
  }

  async createUser(data: CreateUserDto): Promise<any> {
    try {
      const { username, password: rawPassword, fullName, role } = data;
      const existedUser = await this.user({ username });

      if (existedUser) throw new Error('Username already exist');

      const passwordHashed = await hashPassword(rawPassword);

      return this.prisma.user.create({
        data: {
          username,
          password: passwordHashed,
          fullName,
          role,
        },
      });
    } catch (error) {
      this.logger.error(`${error.message}`);
      throw new BadRequestException(error.message);
    }
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: UpdateUserDto;
  }): Promise<User> {
    try {
      const { where, data } = params;
      const existedUser = await this.user({ id: where.id });

      if (!existedUser) throw new Error('Account Not Found');

      const passwordHashed = await hashPassword(data.password);

      return this.prisma.user.update({
        data: {
          ...data,
          password: passwordHashed,
        },
        where,
      });
    } catch (error) {
      this.logger.error(`${error.message}`);
      throw new BadRequestException(error.message);
    }
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<any> {
    try {
      const existedUser = await this.user(where);

      if (!existedUser) throw new Error('Account Not Found');

      await this.prisma.user.delete({
        where,
      });

      return true;
    } catch (error) {
      this.logger.error(`${error.message}`);
      throw new BadRequestException(error.message);
    }
  }
}
