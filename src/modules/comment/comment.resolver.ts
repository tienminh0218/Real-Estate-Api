import {
  Comment_BrokerCustom,
  Comment_CompanyCustom,
  Comment_ProjectCustom,
  Comment_PropertyCustom,
} from './types/news.type';
import { Public } from './../auth/decorators/public.decorator';
import { RequestWithUser } from '../auth/interface/requestWithUser';
import { ReqGraph } from './../auth/decorators/context';
import {
  Method,
  Methods,
  Paths,
} from './../auth/decorators/method-graph.decorator';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CommentService } from './comment.service';

import {
  Comment_Broker as Comment_BrokerGraphType,
  Comment_Company as Comment_CompanyGraphType,
  Comment_Project as Comment_ProjectGraphType,
  Comment_Property as Comment_PropertyGraphType,
} from './types/graph-model.type';
import { CreateCommentDto } from './dto/create-comment.dto';
import { PaginationInput } from 'src/common/types/pagination.type';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Resolver((of) => Comment_BrokerGraphType)
export class Comment_BrokerResolver {
  constructor(private readonly commentService: CommentService) {}

  @Mutation(() => Comment_BrokerGraphType)
  @Method(Methods.POST, Paths.COMMENT)
  createBrokerComment(
    @ReqGraph() req: RequestWithUser,
    @Args('id') id: string,
    @Args('inputData') data: CreateCommentDto,
  ) {
    return this.commentService.createBrokerComment(req.user, data, id);
  }

  @Query(() => Comment_BrokerGraphType)
  @Public()
  getBrokerCommentById(@Args('id') id: string) {
    return this.commentService.getBrokerCommentById({ id });
  }

  @Query(() => Comment_BrokerCustom)
  @Public()
  getAllBrokerComments(@Args('pagination') optional: PaginationInput) {
    return this.commentService.getAllBrokerComments(optional);
  }

  @Mutation(() => Comment_BrokerGraphType)
  @Method(Methods.PUT, Paths.COMMENT)
  updateBrokerCommentById(
    @ReqGraph() req: RequestWithUser,
    @Args('id') id: string,
    @Args('inputData') data: UpdateCommentDto,
  ) {
    return this.commentService.updateBrokerComment(req.user, { id }, data);
  }

  @Mutation(() => Comment_BrokerGraphType)
  @Method(Methods.DELETE, Paths.COMMENT)
  deleteBrokerCommentById(
    @ReqGraph() req: RequestWithUser,
    @Args('id') id: string,
  ): Promise<Comment_BrokerGraphType> {
    return this.commentService.deleteBrokerCommentById(req.user, { id });
  }
}

@Resolver((of) => Comment_CompanyGraphType)
export class Comment_CompanyResolver {
  constructor(private readonly commentService: CommentService) {}

  @Mutation(() => Comment_CompanyGraphType)
  @Method(Methods.POST, Paths.COMMENT)
  createCompanyComment(
    @ReqGraph() req: RequestWithUser,
    @Args('id') id: string,
    @Args('inputData') data: CreateCommentDto,
  ) {
    return this.commentService.createCompanyComment(req.user, data, id);
  }

  @Query(() => Comment_CompanyGraphType)
  @Public()
  getCompanyCommentById(@Args('id') id: string) {
    return this.commentService.getCompanyCommentById({ id });
  }

  @Query(() => Comment_CompanyCustom)
  @Public()
  getAllCompanyComments(@Args('pagination') optional: PaginationInput) {
    return this.commentService.getAllCompanyComments(optional);
  }

  @Mutation(() => Comment_CompanyGraphType)
  @Method(Methods.PUT, Paths.COMMENT)
  updateCompanyCommentById(
    @ReqGraph() req: RequestWithUser,
    @Args('id') id: string,
    @Args('inputData') data: UpdateCommentDto,
  ) {
    return this.commentService.updateCompanyComment(req.user, { id }, data);
  }

  @Mutation(() => Comment_CompanyGraphType)
  @Method(Methods.DELETE, Paths.COMMENT)
  deleteCompanyCommentById(
    @ReqGraph() req: RequestWithUser,
    @Args('id') id: string,
  ): Promise<Comment_CompanyGraphType> {
    return this.commentService.deleteCompanyCommentById(req.user, { id });
  }
}

@Resolver((of) => Comment_ProjectGraphType)
export class Comment_ProjectResolver {
  constructor(private readonly commentService: CommentService) {}

  @Mutation(() => Comment_ProjectGraphType)
  @Method(Methods.POST, Paths.COMMENT)
  createProjectComment(
    @ReqGraph() req: RequestWithUser,
    @Args('id') id: string,
    @Args('inputData') data: CreateCommentDto,
  ) {
    return this.commentService.createProjectComment(req.user, data, id);
  }

  @Query(() => Comment_ProjectGraphType)
  @Public()
  getProjectCommentById(@Args('id') id: string) {
    return this.commentService.getProjectCommentById({ id });
  }

  @Query(() => Comment_ProjectCustom)
  @Public()
  getAllProjectComments(@Args('pagination') optional: PaginationInput) {
    return this.commentService.getAllProjectComments(optional);
  }

  @Mutation(() => Comment_ProjectGraphType)
  @Method(Methods.PUT, Paths.COMMENT)
  updateProjectCommentById(
    @ReqGraph() req: RequestWithUser,
    @Args('id') id: string,
    @Args('inputData') data: UpdateCommentDto,
  ) {
    return this.commentService.updateProjectComment(req.user, { id }, data);
  }

  @Mutation(() => Comment_ProjectGraphType)
  @Method(Methods.DELETE, Paths.COMMENT)
  deleteProjectCommentById(
    @ReqGraph() req: RequestWithUser,
    @Args('id') id: string,
  ): Promise<Comment_ProjectGraphType> {
    return this.commentService.deleteProjectCommentById(req.user, { id });
  }
}

@Resolver((of) => Comment_PropertyGraphType)
export class Comment_PropertyResolver {
  constructor(private readonly commentService: CommentService) {}

  @Mutation(() => Comment_PropertyGraphType)
  @Method(Methods.POST, Paths.COMMENT)
  createPropertyComment(
    @ReqGraph() req: RequestWithUser,
    @Args('id') id: string,
    @Args('inputData') data: CreateCommentDto,
  ) {
    return this.commentService.createPropertyComment(req.user, data, id);
  }

  @Query(() => Comment_PropertyGraphType)
  @Public()
  getPropertyCommentById(@Args('id') id: string) {
    return this.commentService.getPropertyCommentById({ id });
  }

  @Query(() => Comment_PropertyCustom)
  @Public()
  getAllPropertyComments(@Args('pagination') optional: PaginationInput) {
    return this.commentService.getAllPropertyComments(optional);
  }

  @Mutation(() => Comment_PropertyGraphType)
  @Method(Methods.PUT, Paths.COMMENT)
  updatePropertyCommentById(
    @ReqGraph() req: RequestWithUser,
    @Args('id') id: string,
    @Args('inputData') data: UpdateCommentDto,
  ) {
    return this.commentService.updatePropertyComment(req.user, { id }, data);
  }

  @Mutation(() => Comment_PropertyGraphType)
  @Method(Methods.DELETE, Paths.COMMENT)
  deletePropertyCommentById(
    @ReqGraph() req: RequestWithUser,
    @Args('id') id: string,
  ): Promise<Comment_PropertyGraphType> {
    return this.commentService.deletePropertyCommentById(req.user, { id });
  }
}
