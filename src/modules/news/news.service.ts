import { News, Prisma } from '@prisma/client';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { NewsCustom } from './types/news.type';
import { NewsRepository } from './repositories/news.repository';

@Injectable()
export class NewsService {
  constructor(
    private newsRepository: NewsRepository,
    private readonly logger: Logger,
  ) {}

  async createNews(data: Prisma.NewsCreateInput, user: any): Promise<any> {
    try {
      return this.newsRepository.create(data, user);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new BadRequestException('Author not found');
        }
      }
    }
  }

  async getAllNews(data: any): Promise<NewsCustom> {
    try {
      return this.newsRepository.getAll(data);
    } catch (error) {
      this.logger.error(`${error.message}`);
      throw new BadRequestException(error.message);
    }
  }

  async getNewsById(
    NewsWhereUniqueInput: Prisma.NewsWhereUniqueInput,
  ): Promise<News> {
    try {
      return this.newsRepository.getById(NewsWhereUniqueInput);
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
      return this.newsRepository.update(data, where);
    } catch (error) {
      this.logger.error(`${error.message}`);
      throw new BadRequestException(error.message);
    }
  }

  async deleteNews(where: Prisma.NewsWhereUniqueInput): Promise<News> {
    try {
      return this.newsRepository.delete(where);
    } catch (error) {
      this.logger.error(`${error.message}`);
      throw new BadRequestException(error.message);
    }
  }
}
