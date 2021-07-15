import { CreateBrokerDto } from './dto/create-broker.dto';
import { Prisma } from '@prisma/client';
import {
  Injectable,
  Logger,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class BrokerService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly logger: Logger,
    private readonly jwtService: JwtService,
  ) {}

  async createBroker(cookies: any, data: CreateBrokerDto) {
    try {
      const decode = await this.checkToken(cookies);
      const { district, city } = data;
      const broker = await this.prismaService.broker.create({
        data: {
          district: district,
          city: city,
          user: { connect: { id: decode.id } },
        },
      });
      return broker;
    } catch (error) {
      throw new BadRequestException('You are already a Broker!!!');
    }
  }

  async checkToken(token: any) {
    const secret = process.env.JWT_SECRET;
    try {
      const decode = await this.jwtService.verify(token, { secret: secret });

      // console.log(decode);
      return decode;
    } catch (err) {
      throw new UnauthorizedException('Unauthorized');
    }
  }
}
