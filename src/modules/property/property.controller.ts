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
import { UpdatePropertyDto } from './dto/update-property.dto';
import { CreatePropertyDto } from './dto/create-property.dto';
import {
  OptionalQueryProperty,
  OptionalQueryProperties,
} from './types/optional-query.type';
import { PropertyCustom } from './types/property.type';
import { RequestWithUser } from '../auth/interface/requestWithUser';
import { Public } from '../auth/decorators/public.decorator';

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
    return await this.propertyService.properties({}, optional);
  }

  @Get('priceAndLocation')
  @Public()
  async filterProperties(@Query() data: any): Promise<any> {
    return await this.propertyService.getRangeProperties(data);
  }

  @Get('user/:id')
  @Public()
  @ApiOkResponse({ description: 'Get property list of user' })
  async getPropertiesUser(
    @Param('id') id: string,
    @Query() optional: OptionalQueryProperties,
  ): Promise<any> {
    return await this.propertyService.getPropertiesOfUser(id, optional);
  }

  @Get('project/:id')
  @Public()
  @ApiOkResponse({ description: 'Get property list of project' })
  async getPropertiesProject(
    @Param('id') id: string,
    @Query() optional: OptionalQueryProperties,
  ): Promise<any> {
    return await this.propertyService.getPropertiesOfProject(id, optional);
  }

  @Get('broker/:id')
  @Public()
  @ApiOkResponse({ description: 'Get property list of project' })
  async getPropertiesBroker(
    @Param('id') id: string,
    @Query() optional: OptionalQueryProperties,
  ): Promise<any> {
    return await this.propertyService.getPropertiesOfBroker(id, optional);
  }

  @Get(':id')
  @Public()
  @ApiOkResponse({ description: 'Get a property by id' })
  async getPropertyById(
    @Param('id') id: string,
    @Query() optional: OptionalQueryProperty,
  ): Promise<Property> {
    return await this.propertyService.property({ where: { id } }, optional);
  }

  @Post('broker')
  @ApiCreatedResponse({ description: 'Create a new property' })
  @ApiUnauthorizedResponse({ description: 'User not logged in' })
  @ApiBadRequestResponse({ description: 'Not found relationship' })
  @UseGuards(IsBroker)
  async createBrokerProperty(
    @Body() payload: CreatePropertyDto,
    @Req() req: RequestWithUser,
  ): Promise<Property> {
    return await this.propertyService.createBrokerProperty(
      payload,
      req.user?.broker?.id,
    );
  }

  @Post(':id')
  @ApiCreatedResponse({ description: 'Create a new property' })
  @ApiUnauthorizedResponse({ description: 'User not logged in' })
  @ApiForbiddenResponse({ description: 'That project is not of user' })
  @ApiBadRequestResponse({ description: 'Not found relationship' })
  @UseGuards(IsUser)
  async createProperty(
    @Param('id') projectId: string,
    @Body() payload: CreatePropertyDto,
  ): Promise<Property> {
    return await this.propertyService.createProperty(payload, projectId);
  }

  @Put(':id/broker')
  @ApiUnauthorizedResponse({ description: 'User not logged in' })
  @ApiBadRequestResponse({ description: 'Broker not found' })
  @UseGuards(IsBroker)
  async assignBroker(
    @Param('id') propertyId: string,
    @Body('brokerId') brokerId: string,
  ): Promise<any> {
    return this.propertyService.assignBroker({ propertyId, brokerId });
  }

  @Put('broker/:id')
  @ApiCreatedResponse({ description: 'Updated success a property' })
  @ApiForbiddenResponse({ description: 'This property not that user' })
  @ApiUnauthorizedResponse({ description: 'User not logged in' })
  @UseGuards(IsBroker)
  async updateBrokerPropertyById(
    @Body() payload: UpdatePropertyDto,
    @Param('id') propertyId: string,
  ): Promise<Property> {
    return await this.propertyService.updateProperty({
      where: { id: propertyId },
      data: payload,
    });
  }

  @Put(':id')
  @ApiCreatedResponse({ description: 'Updated success a property' })
  @ApiForbiddenResponse({ description: 'This property not that user' })
  @ApiUnauthorizedResponse({ description: 'User not logged in' })
  @UseGuards(IsUser)
  async updatePropertyById(
    @Param('id') id: string,
    @Body() payload: UpdatePropertyDto,
  ): Promise<Property> {
    return await this.propertyService.updateProperty({
      where: { id },
      data: payload,
    });
  }

  @Delete('broker/:id')
  @HttpCode(204)
  @ApiNoContentResponse({ description: 'Delete success a property' })
  @ApiForbiddenResponse({ description: 'This property not that user' })
  @ApiUnauthorizedResponse({ description: 'User not logged in' })
  @UseGuards(IsBroker)
  async deleteBrokerPropertyById(
    @Param('id') propertyId: string,
  ): Promise<any> {
    return await this.propertyService.deleteProperty({ id: propertyId });
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiNoContentResponse({ description: 'Delete success a property' })
  @ApiForbiddenResponse({ description: 'This property not that user' })
  @ApiUnauthorizedResponse({ description: 'User not logged in' })
  @UseGuards(IsUser)
  async deletePropertyById(@Param('id') id: string): Promise<any> {
    return await this.propertyService.deleteProperty({ id });
  }
}
