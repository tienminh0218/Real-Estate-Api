import { PrismaModule } from './../prisma/prisma.module';
import { Module, Logger } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';

@Module({
  imports: [PrismaModule],
  providers: [CommentService, Logger],
  controllers: [CommentController],
})
export class CommentModule {}
