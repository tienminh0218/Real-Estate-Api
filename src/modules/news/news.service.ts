import { News, Prisma } from '@prisma/client';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NewsService {
  constructor(
    private prismaService: PrismaService,
    private readonly logger: Logger,
  ) {}

  createNews(data: Prisma.NewsCreateInput, id: string): Promise<any> {
    const { title, content } = data;
    return this.prismaService.news.create({
      data: {
        title: title,
        content: content,
        author: { connect: { id: id } },
      },
      include: {
        author: true, // Include all posts in the returned object
      },
    });
  }

  getAllNews(): Promise<News[]> {
    return this.prismaService.news.findMany();
  }

  async getNewsById(
    NewsWhereUniqueInput: Prisma.NewsWhereUniqueInput,
  ): Promise<News> {
    try {
      const existedNews = await this.prismaService.news.findUnique({
        where: NewsWhereUniqueInput,
      });
      if (!existedNews) throw new Error('News not found');
      return existedNews;
    } catch (error) {
      this.logger.error(`${error.message}`);
      throw new BadRequestException(error.message);
    }
  }

  async updateNews(
    data: Prisma.NewsUpdateInput,
    where: Prisma.NewsWhereUniqueInput,
  ): Promise<News> {
    try {
      const existedNews = await this.getNewsById(where);
      if (!existedNews) throw new Error('News not found');
      return this.prismaService.news.update({
        data,
        where,
      });
    } catch (error) {
      this.logger.error(`${error.message}`);
      throw new BadRequestException(error.message);
    }
  }

  async deleteNews(where: Prisma.NewsWhereUniqueInput): Promise<void> {
    try {
      const existedNews = await this.getNewsById(where);
      if (!existedNews) throw new Error('News not found');
      this.prismaService.news.delete({ where });
    } catch (error) {
      this.logger.error(`${error.message}`);
      throw new BadRequestException(error.message);
    }
  }
}
