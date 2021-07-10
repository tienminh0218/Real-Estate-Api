import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { User, Prisma } from '@prisma/client';
import { hashPassword } from '../../utils/hash-password';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService, private readonly logger: Logger) {}

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
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

      if (!existedUser) throw new Error('Accout Not Found');

      return this.prisma.user.update({
        data,
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

      if (!existedUser) throw new Error('Accout Not Found');

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
