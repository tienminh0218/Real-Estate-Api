import { PrismaService } from './../prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class CommentService {
  constructor(
    private prismaService: PrismaService,
    private readonly logger: Logger,
  ) {}

  ///Create comment
  createBrokerComment(data: CreateCommentDto, brokerId: string) {
    const { content, userId } = data;

    return this.prismaService.comment_Broker.create({
      data: {
        content: content,
        broker: { connect: { id: brokerId } },
        user: { connect: { id: userId } },
      },
      include: {
        broker: true, // Include all posts in the returned object
      },
    });
  }

  createCompanyComment(data: CreateCommentDto, brokerId: string) {
    const { content, userId } = data;

    return this.prismaService.comment_Broker.create({
      data: {
        content: content,
        broker: { connect: { id: brokerId } },
        user: { connect: { id: userId } },
      },
      include: {
        broker: true, // Include all posts in the returned object
      },
    });
  }
}
