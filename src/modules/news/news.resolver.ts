import { ReqGraph } from './../auth/decorators/context';
import { Args, Query, Resolver, Mutation } from '@nestjs/graphql';
import { Public } from '../auth/decorators/public.decorator';
import { NewsService } from './news.service';
import { News as NewsGraphType } from './types/graph-model.type';
import { NewsCustom } from './types/news.type';
import { RequestWithUser } from '../auth/interface/requestWithUser';
import {
  Method,
  Methods,
  Paths,
} from '../auth/decorators/method-graph.decorator';
import { PaginationInput } from 'src/common/types/pagination.type';
import { News } from '@prisma/client';
import { UseGuards } from '@nestjs/common';
import { IsBroker } from '../auth/guards/isBroker';
import { UpdateNewsDto } from './dto/update-news.dto';

@Resolver((of) => NewsGraphType)
export class NewsResolver {
  constructor(private readonly newsService: NewsService) {}

  @Mutation(() => NewsGraphType)
  @Method(Methods.POST, Paths.NEWS)
  createNews(
    @ReqGraph() req: RequestWithUser,
    @Args('title') title: string,
    @Args('content') content: string,
  ) {
    const data = { title, content };
    return this.newsService.createNews(data, req.user);
  }

  @Query(() => NewsCustom)
  @Public()
  getAllNews(
    @Args('pagination') optional: PaginationInput,
  ): Promise<NewsCustom> {
    console.log(optional);
    return this.newsService.getAllNews(optional);
  }

  @Query(() => NewsGraphType)
  @Public()
  getNewsById(@Args('id') id: string): Promise<News> {
    return this.newsService.getNewsById({ id });
  }

  @Mutation(() => NewsGraphType)
  @Method(Methods.PUT, Paths.NEWS)
  @UseGuards(IsBroker)
  updateNews(
    @Args('id') id: string,
    @Args('inputData') data: UpdateNewsDto,
  ): Promise<News> {
    return this.newsService.updateNews(data, { id });
  }

  @Mutation(() => NewsGraphType)
  @Method(Methods.DELETE, Paths.NEWS)
  @UseGuards(IsBroker)
  deleteNews(@Args('id') id: string): Promise<News> {
    return this.newsService.deleteNews({ id });
  }
}
