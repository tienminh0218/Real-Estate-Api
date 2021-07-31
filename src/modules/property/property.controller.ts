import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Property } from '@prisma/client';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { IsUser } from './../auth/guards/isUser';
import { IsBroker } from './../auth/guards/isBroker';
import { PropertyService } from './property.service';
import { UpdatePropertyDto, AssignBroker } from './dto/update-property.dto';
import { CreatePropertyDto } from './dto/create-property.dto';
import { OptionalQueryProperties } from './types/optional-query.type';
import { PropertyCustom } from './types/property.type';
import { RequestWithUser } from '../auth/interface/requestWithUser';
import { Public } from '../auth/decorators/public.decorator';
import { FilterQuery } from './dto/filter-property.dto';

@ApiTags('Properties')
@Controller('properties')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Get()
  @Public()
  @ApiOkResponse({ description: 'Get all properties' })
  async getAllProperty(
    @Query() optional: OptionalQueryProperties,
  ): Promise<PropertyCustom> {
    return this.propertyService.properties({}, optional);
  }

  @Get('filter')
  @Public()
  @ApiOkResponse({ description: 'Filter properties by price and city' })
  async filterProperties(@Query() data: FilterQuery): Promise<any> {
    return this.propertyService.getRangeProperties(data);
  }

  @Get('user/:id')
  @Public()
  @ApiOkResponse({ description: 'Get property list of user' })
  async getPropertiesUser(
    @Param('id') userId: string,
    @Query() optional: OptionalQueryProperties,
  ): Promise<any> {
    return this.propertyService.getPropertiesOfUser(userId, optional);
  }

  @Get('project/:id')
  @Public()
  @ApiOkResponse({ description: 'Get property list of project' })
  async getPropertiesProject(
    @Param('id') projectId: string,
    @Query() optional: OptionalQueryProperties,
  ): Promise<any> {
    return this.propertyService.getPropertiesOfProject(projectId, optional);
  }

  @Get('broker/:id')
  @Public()
  @ApiOkResponse({ description: 'Get property list of project' })
  async getPropertiesBroker(
    @Param('id') brokerId: string,
    @Query() optional: OptionalQueryProperties,
  ): Promise<any> {
    return this.propertyService.getPropertiesOfBroker(brokerId, optional);
  }

  @Get(':id')
  @Public()
  @ApiOkResponse({ description: 'Get a property by id' })
  getPropertyById(@Param('id') id: string): Promise<Property> {
    return this.propertyService.property({ where: { id } });
  }

  @Post('broker')
  @ApiCreatedResponse({ description: 'Create a new property' })
  @ApiUnauthorizedResponse({ description: 'User not logged in' })
  @ApiForbiddenResponse({ description: 'That project is not of user' })
  @ApiBadRequestResponse({ description: 'Not found relationship' })
  @UseGuards(IsBroker)
  async createBrokerProperty(
    @Body() payload: CreatePropertyDto,
    @Req() req: RequestWithUser,
  ): Promise<Property> {
    return this.propertyService.createBrokerProperty(
      payload,
      req.user.broker.id,
    );
  }

  @Post('project/:id')
  @ApiCreatedResponse({ description: 'Create a new property' })
  @ApiUnauthorizedResponse({ description: 'User not logged in' })
  @ApiForbiddenResponse({ description: 'That project is not of user' })
  @ApiBadRequestResponse({ description: 'Not found relationship' })
  @UseGuards(IsUser)
  async createProperty(
    @Param('id') id: string,
    @Body() payload: CreatePropertyDto,
  ): Promise<Property> {
    return this.propertyService.createProperty(payload, id);
  }

  @Put(':id/assignBroker')
  @ApiUnauthorizedResponse({ description: 'User not logged in' })
  @ApiBadRequestResponse({ description: 'Broker not found' })
  @UseGuards(IsBroker)
  async assignBroker(
    @Param('id') propertyId: string,
    @Body() payload: AssignBroker,
  ): Promise<any> {
    return this.propertyService.assignBroker({
      propertyId,
      brokerId: payload.brokerId,
    });
  }

  @Put(':id/broker')
  @ApiCreatedResponse({ description: 'Updated success a property' })
  @ApiForbiddenResponse({ description: 'This property not that user' })
  @ApiUnauthorizedResponse({ description: 'User not logged in' })
  @UseGuards(IsBroker)
  async updateBrokerPropertyById(
    @Body() payload: UpdatePropertyDto,
    @Param('id') id: string,
  ): Promise<Property> {
    return this.propertyService.updateProperty({
      where: { id },
      data: payload,
    });
  }

  @Put(':id/project')
  @ApiCreatedResponse({ description: 'Updated success a property' })
  @ApiForbiddenResponse({ description: 'This property not that user' })
  @ApiUnauthorizedResponse({ description: 'User not logged in' })
  @UseGuards(IsUser)
  async updateProjectPropertyById(
    @Param('id') id: string,
    @Body() payload: UpdatePropertyDto,
  ): Promise<Property> {
    return this.propertyService.updateProperty({
      where: { id },
      data: payload,
    });
  }

  @Delete(':id/broker')
  @HttpCode(204)
  @ApiNoContentResponse({ description: 'Delete success a property' })
  @ApiForbiddenResponse({ description: 'This property not that broker' })
  @ApiUnauthorizedResponse({ description: 'User not logged in' })
  @UseGuards(IsBroker)
  async deleteBrokerPropertyById(@Param('id') id: string): Promise<any> {
    return this.propertyService.deleteProperty({ id });
  }

  @Delete(':id/project')
  @HttpCode(204)
  @ApiNoContentResponse({ description: 'Delete success a property' })
  @ApiForbiddenResponse({ description: 'This property not that user' })
  @ApiUnauthorizedResponse({ description: 'User not logged in' })
  @UseGuards(IsUser)
  async deleteProjectPropertyById(@Param('id') id: string): Promise<any> {
    return this.propertyService.deleteProperty({ id });
  }
}
