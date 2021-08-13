import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class NewsRepository {
  constructor(private prismaService: PrismaService) {}

  async create(data: Prisma.NewsCreateInput, user: any) {
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
  }

  async getAll(data: any) {
    let { page, limit } = data;
    page = +page || 1;
    limit = +limit || 2;
    const news = await this.prismaService.news.findMany({
      take: limit,
      skip: limit * (page - 1),
    });
    return {
      news,
      pagination: {
        page,
        limit,
        totalRows: news.length,
      },
    };
  }

  async getById(NewsWhereUniqueInput: Prisma.NewsWhereUniqueInput) {
    const existedNews = await this.prismaService.news.findUnique({
      where: NewsWhereUniqueInput,
    });
    if (!existedNews) throw new Error('News not found');
    return existedNews;
  }

  async update(
    data: Prisma.NewsUpdateInput,
    where: Prisma.NewsWhereUniqueInput,
  ) {
    const existedNews = await this.getById(where);
    if (!existedNews) throw new Error('News not found');
    return this.prismaService.news.update({
      data,
      where,
    });
  }

  async delete(where: Prisma.NewsWhereUniqueInput) {
    const existedNews = await this.getById(where);
    if (!existedNews) throw new Error('News not found');
    const result = await this.prismaService.news.delete({ where });
    return result;
  }
}
