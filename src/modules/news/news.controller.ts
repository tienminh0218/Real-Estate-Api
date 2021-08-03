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
import { ApiTags } from '@nestjs/swagger';
import { IsBroker } from '../auth/guards/isBroker';
import { RequestWithUser } from '../auth/interface/requestWithUser';

@Controller('news')
@ApiTags('news')
export class NewsController {
  constructor(private newsService: NewsService) {}
  @Post('/:id')
  @UseGuards(IsBroker)
  createNews(
    @Body() data: CreateNewsDto,
    @Req() req: RequestWithUser,
  ): Promise<any> {
    return this.newsService.createNews(data, req.user);
  }

  @Get()
  getAllNews(@Query() data: any): Promise<News[]> {
    return this.newsService.getAllNews(data);
  }

  @Get('/:id')
  getNewsById(@Param('id') id: string): Promise<News> {
    return this.newsService.getNewsById({ id });
  }

  @Put('/:id')
  @UseGuards(IsBroker)
  updateNews(
    @Param('id') id: string,
    @Body() data: UpdateNewsDto,
  ): Promise<News> {
    return this.newsService.updateNews(data, { id });
  }

  @HttpCode(204)
  @Delete('/:id')
  @UseGuards(IsBroker)
  deleteNews(@Param('id') id: string): Promise<void> {
    return this.newsService.deleteNews({ id });
  }
}
