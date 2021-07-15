import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class BrokerService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly logger: Logger,
    private readonly jwtService: JwtService,
  ) {}

  createBroker(cookies: any) {
    const secret = process.env.JWT_SECRET;
    const decode = this.jwtService.decode(cookies);
    console.log(decode, secret, cookies);
    // this.jwtService.verify(cookies.token,secret));
  }
}
