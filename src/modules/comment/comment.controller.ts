import {
  Comment_BrokerCustom,
  Comment_CompanyCustom,
  Comment_ProjectCustom,
  Comment_PropertyCustom,
} from './types/news.type';
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
import {
  ApiTags,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
} from '@nestjs/swagger';

@Controller('comment')
@ApiTags('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  ///Create Comment
  @Post('/broker/:id')
  @ApiUnauthorizedResponse({ description: 'User not logged in' })
  @ApiCreatedResponse({ description: 'Comment has been created' })
  createBrokerComment(
    @Param('id') id: string,
    @Req() req: RequestWithUser,
    @Body() data: CreateCommentDto,
  ): Promise<any> {
    return this.commentService.createBrokerComment(req.user, data, id);
  }

  @Post('/company/:id')
  @ApiUnauthorizedResponse({ description: 'User not logged in' })
  @ApiCreatedResponse({ description: 'Comment has been created' })
  createCompanyComment(
    @Param('id') id: string,
    @Req() req: RequestWithUser,
    @Body() data: CreateCommentDto,
  ): Promise<any> {
    return this.commentService.createCompanyComment(req.user, data, id);
  }

  @Post('/project/:id')
  @ApiUnauthorizedResponse({ description: 'User not logged in' })
  @ApiCreatedResponse({ description: 'Comment has been created' })
  createProjectComment(
    @Param('id') id: string,
    @Req() req: RequestWithUser,
    @Body() data: CreateCommentDto,
  ): Promise<any> {
    return this.commentService.createProjectComment(req.user, data, id);
  }

  @Post('/property/:id')
  @ApiUnauthorizedResponse({ description: 'User not logged in' })
  @ApiCreatedResponse({ description: 'Comment has been created' })
  createPropertyComment(
    @Param('id') id: string,
    @Req() req: RequestWithUser,
    @Body() data: CreateCommentDto,
  ): Promise<any> {
    return this.commentService.createPropertyComment(req.user, data, id);
  }

  ///Get comment by id
  @Get('/broker/:id')
  @ApiOkResponse({ description: 'Get broker comment by id' })
  @ApiBadRequestResponse({ description: 'Comment not found' })
  getBrokerCommentById(@Param('id') id: string): Promise<Comment_Broker> {
    return this.commentService.getBrokerCommentById({ id });
  }

  @Get('/company/:id')
  @ApiOkResponse({ description: 'Get company comment by id' })
  @ApiBadRequestResponse({ description: 'Comment not found' })
  getCompanyCommentById(@Param('id') id: string): Promise<Comment_Company> {
    return this.commentService.getCompanyCommentById({ id });
  }

  @Get('/project/:id')
  @ApiOkResponse({ description: 'Get project comment by id' })
  @ApiBadRequestResponse({ description: 'Comment not found' })
  getProjectCommentById(@Param('id') id: string): Promise<Comment_Project> {
    return this.commentService.getProjectCommentById({ id });
  }

  @Get('/property/:id')
  @ApiOkResponse({ description: 'Get property comment by id' })
  @ApiBadRequestResponse({ description: 'Comment not found' })
  getPropertyCommentById(@Param('id') id: string): Promise<Comment_Property> {
    return this.commentService.getPropertyCommentById({ id });
  }

  ///Get all comments
  @Get('/broker')
  @ApiOkResponse({ description: 'Get all broker comments' })
  getAllBrokerComments(@Query() data: any): Promise<Comment_BrokerCustom> {
    return this.commentService.getAllBrokerComments(data);
  }

  @Get('/company')
  @ApiOkResponse({ description: 'Get all company comments' })
  getAllCompanyComments(@Query() data: any): Promise<Comment_CompanyCustom> {
    return this.commentService.getAllCompanyComments(data);
  }

  @Get('/project')
  @ApiOkResponse({ description: 'Get all project comments' })
  getAllProjectComments(@Query() data: any): Promise<Comment_ProjectCustom> {
    return this.commentService.getAllProjectComments(data);
  }

  @Get('/property')
  @ApiOkResponse({ description: 'Get all property comments' })
  getAllPropertyComments(@Query() data: any): Promise<Comment_PropertyCustom> {
    return this.commentService.getAllPropertyComments(data);
  }

  ///Update comment by id
  @Put('/broker/:id')
  @ApiCreatedResponse({ description: 'Updated success a comment' })
  @ApiForbiddenResponse({ description: 'This comment not that user' })
  @ApiUnauthorizedResponse({ description: 'User not logged in' })
  updateBrokerCommentById(
    @Param('id') id: string,
    @Req() req: RequestWithUser,
    @Body() data: UpdateCommentDto,
  ): Promise<Comment_Broker> {
    return this.commentService.updateBrokerComment(req.user, { id }, data);
  }

  @Put('/company/:id')
  @ApiCreatedResponse({ description: 'Updated success a comment' })
  @ApiForbiddenResponse({ description: 'This comment not that user' })
  @ApiUnauthorizedResponse({ description: 'User not logged in' })
  updateCompanyCommentById(
    @Param('id') id: string,
    @Req() req: RequestWithUser,
    @Body() data: UpdateCommentDto,
  ): Promise<Comment_Company> {
    return this.commentService.updateCompanyComment(req.user, { id }, data);
  }

  @Put('/project/:id')
  @ApiCreatedResponse({ description: 'Updated success a comment' })
  @ApiForbiddenResponse({ description: 'This comment not that user' })
  @ApiUnauthorizedResponse({ description: 'User not logged in' })
  updateProjectCommentById(
    @Param('id') id: string,
    @Req() req: RequestWithUser,
    @Body() data: UpdateCommentDto,
  ): Promise<Comment_Project> {
    return this.commentService.updateProjectComment(req.user, { id }, data);
  }

  @Put('/property/:id')
  @ApiCreatedResponse({ description: 'Updated success a comment' })
  @ApiForbiddenResponse({ description: 'This comment not that user' })
  @ApiUnauthorizedResponse({ description: 'User not logged in' })
  updatePropertyCommentById(
    @Param('id') id: string,
    @Req() req: RequestWithUser,
    @Body() data: UpdateCommentDto,
  ): Promise<Comment_Property> {
    return this.commentService.updatePropertyComment(req.user, { id }, data);
  }
  ///Delete comment by id
  @Delete('/broker/:id')
  @ApiCreatedResponse({ description: 'Deleted success a comment' })
  @ApiForbiddenResponse({ description: 'This comment not that user' })
  @ApiUnauthorizedResponse({ description: 'User not logged in' })
  deleteBrokerCommentById(
    @Req() req: RequestWithUser,
    @Param('id') id: string,
  ): Promise<any> {
    return this.commentService.deleteBrokerCommentById(req.user, { id });
  }

  @Delete('/company/:id')
  @ApiCreatedResponse({ description: 'Deleted success a comment' })
  @ApiForbiddenResponse({ description: 'This comment not that user' })
  @ApiUnauthorizedResponse({ description: 'User not logged in' })
  deleteCompanyCommentById(
    @Req() req: RequestWithUser,
    @Param('id') id: string,
  ): Promise<any> {
    return this.commentService.deleteCompanyCommentById(req.user, { id });
  }

  @Delete('/project/:id')
  @ApiCreatedResponse({ description: 'Deleted success a comment' })
  @ApiForbiddenResponse({ description: 'This comment not that user' })
  @ApiUnauthorizedResponse({ description: 'User not logged in' })
  deleteProjectCommentById(
    @Req() req: RequestWithUser,
    @Param('id') id: string,
  ): Promise<any> {
    return this.commentService.deleteProjectCommentById(req.user, { id });
  }

  @Delete('/property/:id')
  @ApiCreatedResponse({ description: 'Deleted success a comment' })
  @ApiForbiddenResponse({ description: 'This comment not that user' })
  @ApiUnauthorizedResponse({ description: 'User not logged in' })
  deletePropertyCommentById(
    @Req() req: RequestWithUser,
    @Param('id') id: string,
  ): Promise<any> {
    return this.commentService.deletePropertyCommentById(req.user, { id });
  }
}
