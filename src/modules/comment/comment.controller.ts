import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentService } from './comment.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  Comment_Broker,
  Comment_Company,
  Comment_Project,
  Comment_Property,
} from '@prisma/client';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('comment')
@ApiTags('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  ///Create Comment
  @Post('/broker/:id')
  createBrokerComment(
    @Param('id') id: string,
    @Body() data: CreateCommentDto,
  ): Promise<any> {
    return this.commentService.createBrokerComment(data, id);
  }

  @Post('/company/:id')
  createCompanyComment(
    @Param('id') id: string,
    @Body() data: CreateCommentDto,
  ): Promise<any> {
    return this.commentService.createCompanyComment(data, id);
  }

  @Post('/project/:id')
  createProjectComment(
    @Param('id') id: string,
    @Body() data: CreateCommentDto,
  ): Promise<any> {
    return this.commentService.createProjectComment(data, id);
  }

  @Post('/property/:id')
  createPropertyComment(
    @Param('id') id: string,
    @Body() data: CreateCommentDto,
  ): Promise<any> {
    return this.commentService.createPropertyComment(data, id);
  }

  ///Get comment by id
  @Get('/broker/:id')
  getBrokerCommentById(@Param('id') id: string): Promise<Comment_Broker> {
    return this.commentService.getBrokerCommentById({ id });
  }

  @Get('/company/:id')
  getCompanyCommentById(@Param('id') id: string): Promise<Comment_Company> {
    return this.commentService.getCompanyCommentById({ id });
  }

  @Get('/project/:id')
  getProjectCommentById(@Param('id') id: string): Promise<Comment_Project> {
    return this.commentService.getProjectCommentById({ id });
  }

  @Get('/property/:id')
  getPropertyCommentById(@Param('id') id: string): Promise<Comment_Property> {
    return this.commentService.getPropertyCommentById({ id });
  }

  ///Get all comments
  @Get('/broker')
  getAllBrokerComments(): Promise<Comment_Broker[]> {
    return this.commentService.getAllBrokerComments();
  }

  @Get('/company')
  getAllCompanyComments(): Promise<Comment_Company[]> {
    return this.commentService.getAllCompanyComments();
  }

  @Get('/project')
  getAllProjectComments(): Promise<Comment_Project[]> {
    return this.commentService.getAllProjectComments();
  }

  @Get('/property')
  getAllPropertyComments(): Promise<Comment_Property[]> {
    return this.commentService.getAllPropertyComments();
  }

  ///Update comment by id
  @Put('/broker/:id')
  updateBrokerCommentById(
    @Param('id') id: string,
    @Body() data: UpdateCommentDto,
  ): Promise<Comment_Broker> {
    return this.commentService.updateBrokerComment({ id }, data);
  }

  @Put('/company/:id')
  updateCompanyCommentById(
    @Param('id') id: string,
    @Body() data: UpdateCommentDto,
  ): Promise<Comment_Company> {
    return this.commentService.updateCompanyComment({ id }, data);
  }

  @Put('/project/:id')
  updateProjectCommentById(
    @Param('id') id: string,
    @Body() data: UpdateCommentDto,
  ): Promise<Comment_Project> {
    return this.commentService.updateProjectComment({ id }, data);
  }

  @Put('/property/:id')
  updatePropertyCommentById(
    @Param('id') id: string,
    @Body() data: UpdateCommentDto,
  ): Promise<Comment_Property> {
    return this.commentService.updatePropertyComment({ id }, data);
  }
  ///Delete comment by id
  @Delete('/broker/:id')
  deleteBrokerCommentById(@Param('id') id: string): Promise<void> {
    return this.commentService.deleteBrokerCommentById({ id });
  }

  @Delete('/company/:id')
  deleteCompanyCommentById(@Param('id') id: string): Promise<void> {
    return this.commentService.deleteCompanyCommentById({ id });
  }

  @Delete('/project/:id')
  deleteProjectCommentById(@Param('id') id: string): Promise<void> {
    return this.commentService.deleteProjectCommentById({ id });
  }

  @Delete('/property/:id')
  deletePropertyCommentById(@Param('id') id: string): Promise<void> {
    return this.commentService.deletePropertyCommentById({ id });
  }
}
