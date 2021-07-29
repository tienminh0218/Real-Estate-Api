import { JwtAuthGuard } from './../auth/guards/jwt';
import {
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UpdateBrokerDto } from './dto/update-broker.dto';
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
@ApiTags('broker')
@UseGuards(JwtAuthGuard)
export class BrokerController {
  constructor(private readonly brokerService: BrokerService) {}

  @Get('project/:id')
  @ApiOkResponse({ description: 'Get brokers of project' })
  async getBrokersOfProject(@Param('id') id: string) {
    return this.brokerService.getBrokerOfProject({ id });
  }

  @Get('districtOrCity')
  @ApiOkResponse({ description: 'Get brokers of district or city' })
  async getBrokerOfDistrictOrCity(@Query() data: any) {
    return await this.brokerService.getBrokerOfDistrictOrCity(data);
  }

  @Post('create')
  @ApiOkResponse({ description: 'register broker' })
  @ApiUnauthorizedResponse({ description: 'User not logged in' })
  async createBroker(
    @Req() req: RequestWithUser,
    @Body() data: CreateBrokerDto,
  ) {
    return await this.brokerService.createBroker(req.user, data);
  }

  @Put('update')
  @ApiOkResponse({ description: 'update broker infomation' })
  @ApiUnauthorizedResponse({ description: 'User not logged in' })
  async updateBroker(
    @Req() req: RequestWithUser,
    @Body() data: UpdateBrokerDto,
  ) {
    return await this.brokerService.updateBroker(req.user, data);
  }

  @Delete('delete')
  @ApiOkResponse({ description: 'delete broker' })
  @ApiUnauthorizedResponse({ description: 'User not logged in' })
  async deleteBroker(@Req() req: RequestWithUser) {
    return await this.brokerService.deleteBroker(req.user);
  }
}
