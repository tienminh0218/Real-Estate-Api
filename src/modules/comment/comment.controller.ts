import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentService } from './comment.service';
import { Body, Controller, Param, Post } from '@nestjs/common';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  //Create Comment
  @Post('/:id')
  createBrokerComment(@Param('id') id: string, @Body() data: CreateCommentDto) {
    return this.commentService.createBrokerComment(data, id);
  }
}
