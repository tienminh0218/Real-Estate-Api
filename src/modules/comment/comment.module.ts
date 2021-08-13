import {
  Comment_BrokerResolver,
  Comment_CompanyResolver,
  Comment_ProjectResolver,
  Comment_PropertyResolver,
} from './comment.resolver';
import { PrismaModule } from './../prisma/prisma.module';
import { Module, Logger } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { CommentRepository } from './repositories/comment.repository';

@Module({
  imports: [PrismaModule],
  providers: [
    CommentService,
    Logger,
    Comment_BrokerResolver,
    Comment_CompanyResolver,
    Comment_ProjectResolver,
    Comment_PropertyResolver,
    CommentRepository,
  ],
  controllers: [CommentController],
})
export class CommentModule {}
