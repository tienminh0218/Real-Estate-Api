import { RequestWithUser } from './../auth/interface/requestWithUser';
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
  Query,
  Req,
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
    @Req() req: RequestWithUser,
    @Body() data: CreateCommentDto,
  ): Promise<any> {
    return this.commentService.createBrokerComment(req.user, data, id);
  }

  @Post('/company/:id')
  createCompanyComment(
    @Param('id') id: string,
    @Req() req: RequestWithUser,
    @Body() data: CreateCommentDto,
  ): Promise<any> {
    return this.commentService.createCompanyComment(req.user, data, id);
  }

  @Post('/project/:id')
  createProjectComment(
    @Param('id') id: string,
    @Req() req: RequestWithUser,
    @Body() data: CreateCommentDto,
  ): Promise<any> {
    return this.commentService.createProjectComment(req.user, data, id);
  }

  @Post('/property/:id')
  createPropertyComment(
    @Param('id') id: string,
    @Req() req: RequestWithUser,
    @Body() data: CreateCommentDto,
  ): Promise<any> {
    return this.commentService.createPropertyComment(req.user, data, id);
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
  getAllBrokerComments(@Query() data: any): Promise<Comment_Broker[]> {
    return this.commentService.getAllBrokerComments(data);
  }

  @Get('/company')
  getAllCompanyComments(@Query() data: any): Promise<Comment_Company[]> {
    return this.commentService.getAllCompanyComments(data);
  }

  @Get('/project')
  getAllProjectComments(@Query() data: any): Promise<Comment_Project[]> {
    return this.commentService.getAllProjectComments(data);
  }

  @Get('/property')
  getAllPropertyComments(@Query() data: any): Promise<Comment_Property[]> {
    return this.commentService.getAllPropertyComments(data);
  }

  ///Update comment by id
  @Put('/broker/:id')
  updateBrokerCommentById(
    @Param('id') id: string,
    @Req() req: RequestWithUser,
    @Body() data: UpdateCommentDto,
  ): Promise<Comment_Broker> {
    return this.commentService.updateBrokerComment(req.user, { id }, data);
  }

  @Put('/company/:id')
  updateCompanyCommentById(
    @Param('id') id: string,
    @Req() req: RequestWithUser,
    @Body() data: UpdateCommentDto,
  ): Promise<Comment_Company> {
    return this.commentService.updateCompanyComment(req.user, { id }, data);
  }

  @Put('/project/:id')
  updateProjectCommentById(
    @Param('id') id: string,
    @Req() req: RequestWithUser,
    @Body() data: UpdateCommentDto,
  ): Promise<Comment_Project> {
    return this.commentService.updateProjectComment(req.user, { id }, data);
  }

  @Put('/property/:id')
  updatePropertyCommentById(
    @Param('id') id: string,
    @Req() req: RequestWithUser,
    @Body() data: UpdateCommentDto,
  ): Promise<Comment_Property> {
    return this.commentService.updatePropertyComment(req.user, { id }, data);
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
