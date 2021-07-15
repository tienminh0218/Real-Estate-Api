import { AuthGuard } from '@nestjs/passport';
import { BrokerService } from './broker.service';
import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';

@Controller('broker')
@UseGuards(AuthGuard('local'))
export class BrokerController {
  constructor(private readonly brokerService: BrokerService) {}

  @Post('create')
  createBroker(@Req() req: Request) {
    return this.brokerService.createBroker(req.headers.cookie);
    // return this.brokerService.createBroker(req.cookies);
  }
}
