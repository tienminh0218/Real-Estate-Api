import { PropertyService } from './property.service';
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
} from '@nestjs/common';
import { Property } from '@prisma/client';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { CreatePropertyDto } from './dto/create-property.dto';

@Controller('property')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Get('get-all')
  async getAllProperty(@Query() optional): Promise<Property[]> {
    return await this.propertyService.propertys({}, optional);
  }

  @Get(':id')
  async getPropertyById(
    @Param('id') id: string,
    @Query() optional,
  ): Promise<Property> {
    return await this.propertyService.property({ id }, optional);
  }

  @Post()
  async createProperty(@Body() payload: CreatePropertyDto): Promise<Property> {
    return await this.propertyService.createProperty(payload);
  }

  @Put(':id')
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
