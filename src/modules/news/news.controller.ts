import { Public } from './../auth/decorators/public.decorator';
import { UpdateNewsDto } from './dto/update-news.dto';
import { NewsService } from './news.service';
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
import { CreateNewsDto } from './dto/create-news.dto';
import { News } from '@prisma/client';
import {
  ApiTags,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { IsBroker } from '../auth/guards/isBroker';
import { RequestWithUser } from '../auth/interface/requestWithUser';
import { NewsCustom } from './types/news.type';

@ApiTags('news')
@Controller('news')
export class NewsController {
  constructor(private newsService: NewsService) { }

  @Get()
  @Public()
  @ApiOkResponse({ description: 'Get all News' })
  getAllNews(@Query() data: any): Promise<NewsCustom> {
    return this.newsService.getAllNews(data);
  }

  @Get('/:id')
  @Public()
  @ApiOkResponse({ description: 'Get news by id' })
  @ApiBadRequestResponse({ description: 'News not found' })
  getNewsById(@Param('id') id: string): Promise<News> {
    return this.newsService.getNewsById({ id });
  }

  @Post()
  @UseGuards(IsBroker)
  @ApiUnauthorizedResponse({ description: 'User not logged in' })
  @ApiForbiddenResponse({ description: 'You need be a broker' })
  @ApiCreatedResponse({ description: 'News has been created' })
  createNews(
    @Body() data: CreateNewsDto,
    @Req() req: RequestWithUser,
  ): Promise<any> {
    return this.newsService.createNews(data, req.user);
  }

  @Put('/:id')
  @UseGuards(IsBroker)
  @ApiOkResponse({ description: 'Updated broker' })
  @ApiUnauthorizedResponse({ description: 'User not logged in' })
  @ApiBadRequestResponse({ description: 'News not found' })
  updateNews(
    @Param('id') id: string,
    @Body() data: UpdateNewsDto,
  ): Promise<News> {
    return this.newsService.updateNews(data, { id });
  }

  @HttpCode(204)
  @Delete('/:id')
  @UseGuards(IsBroker)
  @ApiOkResponse({ description: 'Deleted broker' })
  @ApiUnauthorizedResponse({ description: 'User not logged in' })
  @ApiBadRequestResponse({ description: 'News not found' })
  deleteNews(@Param('id') id: string): Promise<News> {
    return this.newsService.deleteNews({ id });
  }
}
