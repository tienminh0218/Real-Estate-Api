import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { UpdateCommentDto } from '../dto/update-comment.dto';

@Injectable()
export class CommentRepository {
  constructor(private prismaService: PrismaService) {}
  ///Create comment

  async createBrokerComment(
    user: any,
    data: CreateCommentDto,
    brokerId: string,
  ) {
    const { content } = data;
    const comment = await this.prismaService.comment_Broker.create({
      data: {
        content: content,
        broker: { connect: { id: brokerId } },
        user: { connect: { id: user.id } },
      },
      include: {
        broker: true,
      },
    });
    return comment;
  }

  async createCompanyComment(
    user: any,
    data: CreateCommentDto,
    companyId: string,
  ) {
    const { content } = data;

    const comment = await this.prismaService.comment_Company.create({
      data: {
        content: content,
        company: { connect: { id: companyId } },
        user: { connect: { id: user.id } },
      },
      include: {
        company: true,
      },
    });

    return comment;
  }

  async createProjectComment(
    user: any,
    data: CreateCommentDto,
    projectId: string,
  ) {
    const { content } = data;

    const comment = await this.prismaService.comment_Project.create({
      data: {
        content: content,
        project: { connect: { id: projectId } },
        user: { connect: { id: user.id } },
      },
      include: {
        project: true,
      },
    });
    return comment;
  }

  async createPropertyComment(
    user: any,
    data: CreateCommentDto,
    propertyId: string,
  ) {
    const { content } = data;

    const comment = await this.prismaService.comment_Property.create({
      data: {
        content: content,
        property: { connect: { id: propertyId } },
        user: { connect: { id: user.id } },
      },
      include: {
        property: true,
      },
    });
    return comment;
  }

  ///Get comment by id
  async getBrokerCommentById(id: Prisma.Comment_BrokerWhereUniqueInput) {
    const existedComment = await this.prismaService.comment_Broker.findUnique({
      where: id,
    });
    if (!existedComment) throw new Error('Comment not found');
    return existedComment;
  }

  async getCompanyCommentById(id: Prisma.Comment_CompanyWhereUniqueInput) {
    const existedComment = await this.prismaService.comment_Company.findUnique({
      where: id,
    });
    if (!existedComment) throw new Error('Comment not found');
    return existedComment;
  }

  async getProjectCommentById(id: Prisma.Comment_ProjectWhereUniqueInput) {
    const existedComment = await this.prismaService.comment_Project.findUnique({
      where: id,
    });
    if (!existedComment) throw new Error('Comment not found');
    return existedComment;
  }

  async getPropertyCommentById(id: Prisma.Comment_PropertyWhereUniqueInput) {
    const existedComment = await this.prismaService.comment_Property.findUnique(
      {
        where: id,
      },
    );
    if (!existedComment) throw new Error('Comment not found');
    return existedComment;
  }

  /// get all comments
  async getAllBrokerComments(data: any) {
    let { page, limit } = data;
    page = +page || 1;
    limit = +limit || 5;

    const comment = await this.prismaService.comment_Broker.findMany({
      take: limit,
      skip: limit * (page - 1),
    });
    return {
      comment,
      pagination: {
        page,
        limit,
        totalRows: comment.length,
      },
    };
  }

  async getAllCompanyComments(data: any) {
    let { page, limit } = data;
    page = +page || 1;
    limit = +limit || 5;
    const comment = await this.prismaService.comment_Company.findMany({
      take: limit,
      skip: limit * (page - 1),
    });
    return {
      comment,
      pagination: {
        page,
        limit,
        totalRows: comment.length,
      },
    };
  }

  async getAllProjectComments(data: any) {
    let { page, limit } = data;
    page = +page || 1;
    limit = +limit || 5;
    const comment = await this.prismaService.comment_Project.findMany({
      take: limit,
      skip: limit * (page - 1),
    });
    return {
      comment,
      pagination: {
        page,
        limit,
        totalRows: comment.length,
      },
    };
  }

  async getAllPropertyComments(data: any) {
    let { page, limit } = data;
    page = +page || 1;
    limit = +limit || 5;
    const comment = await this.prismaService.comment_Property.findMany({
      take: limit,
      skip: limit * (page - 1),
    });
    return {
      comment,
      pagination: {
        page,
        limit,
        totalRows: comment.length,
      },
    };
  }

  ///update comment by id
  async updateBrokerComment(
    user: any,
    where: Prisma.Comment_BrokerWhereUniqueInput,
    data: UpdateCommentDto,
  ) {
    const existedComment = await this.getBrokerCommentById(where);
    this.checkCommenIsUser(existedComment, user);
    const comment = await this.prismaService.comment_Broker.update({
      data,
      where,
    });
    return comment;
  }

  async updateCompanyComment(
    user: any,
    where: Prisma.Comment_CompanyWhereUniqueInput,
    data: UpdateCommentDto,
  ) {
    const existedComment = await this.getCompanyCommentById(where);
    this.checkCommenIsUser(existedComment, user);
    const comment = await this.prismaService.comment_Company.update({
      data,
      where,
    });
    return comment;
  }

  async updateProjectComment(
    user: any,
    where: Prisma.Comment_ProjectWhereUniqueInput,
    data: UpdateCommentDto,
  ) {
    const existedComment = await this.getProjectCommentById(where);
    this.checkCommenIsUser(existedComment, user);
    const comment = await this.prismaService.comment_Project.update({
      data,
      where,
    });
    return comment;
  }

  async updatePropertyComment(
    user: any,
    where: Prisma.Comment_PropertyWhereUniqueInput,
    data: UpdateCommentDto,
  ) {
    const existedComment = await this.getPropertyCommentById(where);
    this.checkCommenIsUser(existedComment, user);
    const comment = await this.prismaService.comment_Property.update({
      data,
      where,
    });
    return comment;
  }

  ///delete comment by id
  async deleteBrokerCommentById(
    user: any,
    where: Prisma.Comment_BrokerWhereUniqueInput,
  ) {
    const existedComment = await this.getBrokerCommentById(where);
    this.checkCommenIsUser(existedComment, user);
    const result = await this.prismaService.comment_Broker.delete({ where });
    return result;
  }

  async deleteCompanyCommentById(
    user: any,
    where: Prisma.Comment_CompanyWhereUniqueInput,
  ) {
    const existedComment = await this.getCompanyCommentById(where);
    this.checkCommenIsUser(existedComment, user);
    const result = await this.prismaService.comment_Company.delete({ where });
    return result;
  }

  async deleteProjectCommentById(
    user: any,
    where: Prisma.Comment_ProjectWhereUniqueInput,
  ) {
    const existedComment = await this.getProjectCommentById(where);
    this.checkCommenIsUser(existedComment, user);
    const result = await this.prismaService.comment_Project.delete({ where });
    return result;
  }

  async deletePropertyCommentById(
    user: any,
    where: Prisma.Comment_PropertyWhereUniqueInput,
  ) {
    const existedComment = await this.getPropertyCommentById(where);
    this.checkCommenIsUser(existedComment, user);
    const result = await this.prismaService.comment_Property.delete({
      where,
    });
    return result;
  }

  checkCommenIsUser(existedComment, user) {
    if (!existedComment) throw new Error('Comment not found');
    if (existedComment.userId !== user.id) {
      throw new Error('This comment not that user');
    }
  }
}
