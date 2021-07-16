import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';

import { CreateBrokerDto } from './dto/create-broker.dto';
import { BrokerService } from './broker.service';
import { JwtAuthGuard } from '../auth/guards/jwt';
import { RequestWithUser } from '../auth/interface/requestWithUser';

@Controller('broker')
@UseGuards(JwtAuthGuard)
export class BrokerController {
  constructor(private readonly brokerService: BrokerService) {}

  @Post('create')
  createBroker(@Req() req: RequestWithUser, @Body() data: CreateBrokerDto) {
    return this.brokerService.createBroker(req.user, data);
  }
}
