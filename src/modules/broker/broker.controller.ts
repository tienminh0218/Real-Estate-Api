import { CreateBrokerDto } from './dto/create-broker.dto';
import { AuthGuard } from '@nestjs/passport';
import { BrokerService } from './broker.service';
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';

@Controller('broker')
@UseGuards(AuthGuard('local'))
export class BrokerController {
  constructor(private readonly brokerService: BrokerService) {}

  @Post('create')
  createBroker(@Req() req: Request, @Body() data: CreateBrokerDto) {
    // console.log(req.cookies[process.env.COOKIE_NAME]);
    return this.brokerService.createBroker(
      req.cookies[process.env.COOKIE_NAME],
      data,
    );
  }
}
