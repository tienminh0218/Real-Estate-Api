import { JwtAuthGuard } from './../auth/guards/jwt';
import { UpdateBrokerDto } from './dto/update-broker.dto';
import { BrokerCustom } from './types/broker.type';
import { BrokerService } from './broker.service';
import { Broker as BrokerGraphType } from './types/graph-model.type';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Public } from '../auth/decorators/public.decorator';
import { PaginationInput } from 'src/common/types/pagination.type';
import {
  Method,
  Methods,
  Paths,
} from '../auth/decorators/method-graph.decorator';
import { RequestWithUser } from '../auth/interface/requestWithUser';
import { ReqGraph } from '../auth/decorators/context';
import { CreateBrokerDto } from './dto/create-broker.dto';
import { UseGuards } from '@nestjs/common';

@Resolver((of) => BrokerGraphType)
@UseGuards(JwtAuthGuard)
export class BrokerResolver {
  constructor(private readonly brokerService: BrokerService) {}

  @Query(() => BrokerCustom)
  @Public()
  async getBrokersOfProperty(
    @Args('pagination') optional: PaginationInput,
    @Args('id') propertyId: string,
    @Args('name') propertyName: string,
  ) {
    const { limit, page } = optional;
    const data = { limit, page, propertyId, propertyName };
    return this.brokerService.getBrokerOfProperty(data);
    // const result = await this.brokerService.getBrokerOfProperty(data);
    // const { brokers, pagination } = result;
    // let b = {};
    // brokers.forEach(async function (e) {
    //   b = e.broker;
    // });
    // console.log(b);
    // console.log(result);
    // return result;
  }

  @Query(() => BrokerCustom)
  @Public()
  async getBrokersOfProject(
    @Args('pagination') optional: PaginationInput,
    @Args('id') propertyId: string,
    @Args('name') propertyName: string,
  ) {
    const { limit, page } = optional;
    const data = { limit, page, propertyId, propertyName };
    return this.brokerService.getBrokerOfProject(data);
    /// chua xog
  }

  @Query(() => BrokerCustom)
  @Public()
  async getBrokerOfDistrictOrCity(
    @Args('pagination') optional: PaginationInput,
    @Args('district') district: string,
    @Args('city') city: string,
  ): Promise<BrokerCustom> {
    const { limit, page } = optional;
    const data = { limit, page, district, city };
    const a = await this.brokerService.getBrokerOfDistrictOrCity(data);
    return a;
    // return await this.brokerService.getBrokerOfDistrictOrCity(data);
  }

  @Mutation(() => BrokerGraphType)
  @Method(Methods.POST, Paths.BROKER)
  async createBroker(
    @ReqGraph() req: RequestWithUser,
    @Args('inputData') data: CreateBrokerDto,
  ) {
    return await this.brokerService.createBroker(req.user, data);
  }

  @Mutation(() => BrokerGraphType)
  @Method(Methods.PUT, Paths.BROKER)
  async updateBroker(
    @ReqGraph() req: RequestWithUser,
    @Args('inputData') data: UpdateBrokerDto,
  ) {
    return await this.brokerService.updateBroker(req.user, data);
  }

  @Mutation(() => BrokerGraphType)
  @Method(Methods.DELETE, Paths.BROKER)
  async deleteBroker(@ReqGraph() req: RequestWithUser) {
    return await this.brokerService.deleteBroker(req.user);
  }
}
