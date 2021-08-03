import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { Property } from '@prisma/client';

import { PropertyService } from './property.service';
import { Property as PropertyGraphType } from './types/graph-model.type';
import { PropertyCustom } from './types/property.type';
import { PaginationInput } from '../../common/types/pagination.type';
import { Public } from '../auth/decorators/public.decorator';
import { FilterQuery } from './dto/filter-property.dto';
import { CreatePropertyDto } from './dto/create-property.dto';
import { ReqGraph } from '../auth/decorators/context';
import { RequestWithUser } from '../auth/interface/requestWithUser';
import { IsBroker } from '../auth/guards/isBroker';
import {
  Method,
  Methods,
  Paths,
} from '../auth/decorators/method-graph.decorator';
import { IsUser } from '../auth/guards/isUser';
import { AssignBroker, UpdatePropertyDto } from './dto/update-property.dto';

@Resolver((of) => PropertyGraphType)
export class PropertyResolver {
  constructor(private readonly propertyService: PropertyService) {}

  @Query(() => PropertyCustom)
  @Public()
  getProperties(
    @Args('pagination') optional: PaginationInput,
  ): Promise<PropertyCustom> {
    return this.propertyService.properties({}, optional);
  }

  @Query(() => PropertyGraphType)
  @Public()
  getPropertyById(@Args('id') id: string): Promise<Property> {
    return this.propertyService.property({ where: { id } });
  }

  @Query(() => PropertyCustom)
  @Public()
  filterProperties(
    @Args('filterInput') filterInput: FilterQuery,
  ): Promise<PropertyCustom> {
    return this.propertyService.getRangeProperties(filterInput);
  }

  @Query(() => PropertyCustom)
  @Public()
  getPropertiesOfUser(
    @Args('id') userId: string,
    @Args('pagination') optional: PaginationInput,
  ): Promise<PropertyCustom> {
    return this.propertyService.getPropertiesOfUser(userId, optional);
  }

  @Query(() => PropertyCustom)
  @Public()
  getPropertiesOfProject(
    @Args('id') projectId: string,
    @Args('pagination') optional: PaginationInput,
  ): Promise<PropertyCustom> {
    return this.propertyService.getPropertiesOfProject(projectId, optional);
  }

  @Query(() => PropertyCustom)
  @Public()
  getPropertiesOfBroker(
    @Args('id') brokerId: string,
    @Args('pagination') optional: PaginationInput,
  ): Promise<PropertyCustom> {
    return this.propertyService.getPropertiesOfBroker(brokerId, optional);
  }

  @Mutation(() => PropertyGraphType)
  @Method(Methods.POST, Paths.PROPERTY)
  @UseGuards(IsBroker)
  createBrokerProperty(
    @Args('inputData') payload: CreatePropertyDto,
    @ReqGraph() req: RequestWithUser,
  ) {
    return this.propertyService.createBrokerProperty(
      payload,
      req.user.broker.id,
    );
  }

  @Mutation(() => PropertyGraphType)
  @Method(Methods.POST, Paths.PROPERTY)
  @UseGuards(IsUser)
  createProperty(
    @Args('id') id: string,
    @Args('inputData') payload: CreatePropertyDto,
  ) {
    return this.propertyService.createProperty(payload, id);
  }

  @Mutation(() => PropertyGraphType)
  @Method(Methods.PUT, Paths.PROPERTY)
  @UseGuards(IsBroker)
  assignBroker(
    @Args('id') propertyId: string,
    @Args('inputData') payload: AssignBroker,
  ) {
    return this.propertyService.assignBroker({
      propertyId,
      brokerId: payload.brokerId,
    });
  }

  @Mutation(() => PropertyGraphType)
  @Method(Methods.PUT, Paths.PROPERTY)
  @UseGuards(IsBroker)
  updateBrokerPropertyById(
    @Args('id') id: string,
    @Args('inputData') payload: UpdatePropertyDto,
  ) {
    return this.propertyService.updateProperty({
      where: { id },
      data: payload,
    });
  }

  @Mutation(() => PropertyGraphType)
  @Method(Methods.PUT, Paths.PROPERTY)
  @UseGuards(IsUser)
  updateProjectPropertyById(
    @Args('id') id: string,
    @Args('inputData') payload: UpdatePropertyDto,
  ) {
    return this.propertyService.updateProperty({
      where: { id },
      data: payload,
    });
  }

  @Query(() => String)
  @Method(Methods.DELETE, Paths.PROPERTY)
  @UseGuards(IsBroker)
  deleteBrokerPropertyById(@Args('id') id: string) {
    const result = this.propertyService.deleteProperty({ id });
    if (result) return 'Delete success';
  }

  @Query(() => String)
  @Method(Methods.DELETE, Paths.PROPERTY)
  @UseGuards(IsUser)
  deleteProjectPropertyById(@Args('id') id: string) {
    const result = this.propertyService.deleteProperty({ id });
    if (result) return 'Delete success';
  }
}
