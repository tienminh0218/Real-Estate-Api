import { IsUser } from './../auth/guards/isUser';
import { JwtAuthGuard } from './../auth/guards/jwt';
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
  UseGuards,
} from '@nestjs/common';
import { Property } from '@prisma/client';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { PropertyService } from './property.service';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { CreatePropertyDto } from './dto/create-property.dto';
import {
  OptionalQueryProperty,
  OptionalQueryProperties,
} from './types/optional-query.type';

@ApiTags('Properties')
@Controller('properties')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Get()
  @ApiOkResponse({ description: 'Get all properties' })
  async getAllProperty(
    @Query() optional: OptionalQueryProperties,
  ): Promise<Property[]> {
    return await this.propertyService.properties({}, optional);
  }

  @Get('priceAndLocation')
  async filterProperties(@Query() data: any): Promise<any> {
    return await this.propertyService.getRangeProperties(data);
  }

  @Get('user/:id')
  @ApiOkResponse({ description: 'Get property list of user' })
  async getPropertiesUser(@Param('id') id: string): Promise<any> {
    return await this.propertyService.getPropertiesOfUser(id);
  }

  @Get('project/:id')
  @ApiOkResponse({ description: 'Get property list of project' })
  async getPropertiesProject(@Param('id') id: string): Promise<any> {
    return await this.propertyService.getPropertiesOfProject(id);
  }

  @Get(':id')
  async getPropertyById(
    @Param('id') id: string,
    @Query() optional: OptionalQueryProperty,
  ): Promise<Property> {
    return await this.propertyService.property({ id }, optional);
  }

  @Post(':id')
  @ApiCreatedResponse({ description: 'Create a new property' })
  @ApiUnauthorizedResponse({ description: 'User not logged in' })
  @ApiBadRequestResponse({ description: 'Not found relationship' })
  @UseGuards(JwtAuthGuard, IsUser)
  async createProperty(
    @Param('id') projectId: string,
    @Body() payload: CreatePropertyDto,
  ): Promise<Property> {
    return await this.propertyService.createProperty(payload, projectId);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, IsUser)
  async updatePropertyById(
    @Param('id') id: string,
    @Body() payload: UpdatePropertyDto,
  ): Promise<Property> {
    return await this.propertyService.updateProperty({
      where: { id },
      data: payload,
    });
  }

  @HttpCode(204)
  @Delete(':id')
  async deletePropertyById(@Param('id') id: string): Promise<any> {
    return await this.propertyService.deleteProperty({ id });
  }
}
