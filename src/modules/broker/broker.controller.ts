import { UpdateBrokerDto } from './dto/update-broker.dto';
import { LocalAuthGuard } from './../auth/guards/local';
import {
  Get,
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  Put,
  Delete,
  Query,
  Param,
} from '@nestjs/common';

import { CreateBrokerDto } from './dto/create-broker.dto';
import { BrokerService } from './broker.service';
import { RequestWithUser } from '../auth/interface/requestWithUser';

@Controller('broker')
@UseGuards(LocalAuthGuard)
export class BrokerController {
  constructor(private readonly brokerService: BrokerService) {}
<<<<<<< HEAD

  @Get('project/:id')
  async getBrokersOfProject(@Param('id') id: string) {
    return this.brokerService.getBrokerOfProject({ id });
  }

  @Get('districtOrCity')
  async getBrokerOfDistrictOrCity(@Query() data: any) {
    return await this.brokerService.getBrokerOfDistrictOrCity(data);
  }

  @Post('create')
  async createBroker(
    @Req() req: RequestWithUser,
    @Body() data: CreateBrokerDto,
  ) {
    return await this.brokerService.createBroker(req.user, data);
  }

  @Put('update')
  async updateBroker(
    @Req() req: RequestWithUser,
    @Body() data: UpdateBrokerDto,
  ) {
    return await this.brokerService.updateBroker(req.user, data);
  }

  @Delete('delete')
  async deleteBroker(@Req() req: RequestWithUser) {
    return await this.brokerService.deleteBroker(req.user);
  }
=======

  // @Post('create')
  // createBroker(@Req() req: RequestWithUser, @Body() data: CreateBrokerDto) {

  //   return this.brokerService.createBroker(req.user, data);
  // }
>>>>>>> 6255e55d09af92363e0bb8edbed66012331eadc3
}
