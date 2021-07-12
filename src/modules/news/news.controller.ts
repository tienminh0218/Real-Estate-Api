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
} from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';

@Controller('news')
export class NewsController {
  constructor(private newsService: NewsService) {}
  @Post('/:id')
  createNews(@Param('id') id: string, @Body() data: CreateNewsDto) {
    return this.newsService.createNews(data, id);
  }

  @Get()
  getAllNews() {
    return this.newsService.getAllNews();
  }

  @Get('/:id')
  getNewsById(@Param('id') id: string) {
    return this.newsService.getNewsById({ id });
  }

  @Put('/:id')
  updateNews(@Param('id') id: string, @Body() data: UpdateNewsDto) {
    return this.newsService.updateNews(data, { id });
  }

  @HttpCode(204)
  @Delete('/:id')
  deleteNews(@Param('id') id: string) {
    return this.newsService.deleteNews({ id });
  }
}
