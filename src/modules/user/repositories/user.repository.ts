import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';
import { UserCustom } from '../types/user.type';
import { FindOneDto, FindManyDto, UpdateByIdDto } from '../dto/repository.dto';
import { OptionalQueryUsers } from '../types/optional-query.type';
import { CreateUserDto } from '../dto/create-user.dto';
import { hashPassword } from '../../../utils/hash-password';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(params: FindOneDto): Promise<User> {
    const { where, include } = params;
    return this.prisma.user.findFirst({ where, include });
  }

  async findById(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.findUnique({
      where,
      include: {
        broker: true,
      },
    });
  }

  async findMany(
    params: FindManyDto,
    optional: OptionalQueryUsers = {},
  ): Promise<UserCustom> {
    const { where, orderBy, include } = params;
    let { page, limit } = optional;
    page = Number(page) || 1;
    limit = Number(limit) || 20;

    const data = await this.prisma.user.findMany({
      take: limit,
      skip: limit * (page - 1),
      where,
      orderBy,
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
  }

  async create(data: CreateUserDto): Promise<any> {
    const { username, password: rawPassword, fullName } = data;

    const existedUser = await this.findOne({ where: { username } });
    if (existedUser) throw new Error('Username already exist');
    const passwordHashed = await hashPassword(rawPassword);

    return this.prisma.user.create({
      data: {
        username,
        password: passwordHashed,
        fullName,
      },
    });
  }

  async updateById(param: UpdateByIdDto): Promise<User> {
    const { where, data } = param;

    const existedUser = await this.findById({ id: where.id });
    if (!existedUser) throw new Error('Account Not Found');
    const passwordHashed = await hashPassword(data.password);

    return this.prisma.user.update({
      where,
      data: {
        ...data,
        password: passwordHashed,
      },
    });
  }

  async deleteById(where: Prisma.UserWhereUniqueInput): Promise<any> {
    return this.prisma.user.delete({
      where,
    });
  }
}
