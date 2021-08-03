import { News, Prisma } from '@prisma/client';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NewsService {
  constructor(
    private prismaService: PrismaService,
    private readonly logger: Logger,
  ) {}

  async createNews(data: Prisma.NewsCreateInput, user: any): Promise<any> {
    try {
      const { title, content } = data;
      const news = await this.prismaService.news.create({
        data: {
          title: title,
          content: content,
          author: { connect: { id: user.broker.id } },
        },
        include: {
          author: true,
        },
      });

      return news;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new BadRequestException('Author not found');
        }
      }
    }
  }

  getAllNews(data: any): Promise<News[]> {
    try {
      let { page, limit } = data;
      page = +page || 1;
      limit = +limit || 2;
      return this.prismaService.news.findMany({
        take: limit,
        skip: limit * (page - 1),
      });
    } catch (error) {
      this.logger.error(`${error.message}`);
      throw new BadRequestException(error.message);
    }
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
      await this.prismaService.news.delete({ where });
    } catch (error) {
      this.logger.error(`${error.message}`);
      throw new BadRequestException(error.message);
    }
  }
}
