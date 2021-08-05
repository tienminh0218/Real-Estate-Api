import {
  Comment_BrokerCustom,
  Comment_CompanyCustom,
  Comment_ProjectCustom,
  Comment_PropertyCustom,
} from './types/news.type';
import {
  Comment_Broker,
  Comment_Company,
  Comment_Project,
  Comment_Property,
  Prisma,
} from '@prisma/client';
import { PrismaService } from './../prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentService {
  constructor(
    private prismaService: PrismaService,
    private readonly logger: Logger,
  ) {}

  ///Create comment
  async createBrokerComment(
    user: any,
    data: CreateCommentDto,
    brokerId: string,
  ) {
    try {
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
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new BadRequestException('Broker not found');
        }
      }
    }
  }

  async createCompanyComment(
    user: any,
    data: CreateCommentDto,
    companyId: string,
  ) {
    try {
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
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new BadRequestException('company not found');
        }
      }
    }
  }

  async createProjectComment(
    user: any,
    data: CreateCommentDto,
    projectId: string,
  ) {
    try {
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
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new BadRequestException('Project not found');
        }
      }
    }
  }

  async createPropertyComment(
    user: any,
    data: CreateCommentDto,
    propertyId: string,
  ) {
    try {
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
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new BadRequestException('Property not found');
        }
      }
    }
  }

  ///Get comment by id
  async getBrokerCommentById(
    id: Prisma.Comment_BrokerWhereUniqueInput,
  ): Promise<Comment_Broker> {
    try {
      const existedComment = await this.prismaService.comment_Broker.findUnique(
        {
          where: id,
        },
      );
      if (!existedComment) throw new Error('Comment not found');
      return existedComment;
    } catch (error) {
      this.logger.error(`${error.message}`);
      throw new BadRequestException(error.message);
    }
  }

  async getCompanyCommentById(
    id: Prisma.Comment_CompanyWhereUniqueInput,
  ): Promise<Comment_Company> {
    try {
      const existedComment =
        await this.prismaService.comment_Company.findUnique({
          where: id,
        });
      if (!existedComment) throw new Error('Comment not found');
      return existedComment;
    } catch (error) {
      this.logger.error(`${error.message}`);
      throw new BadRequestException(error.message);
    }
  }

  async getProjectCommentById(
    id: Prisma.Comment_ProjectWhereUniqueInput,
  ): Promise<Comment_Project> {
    try {
      const existedComment =
        await this.prismaService.comment_Project.findUnique({
          where: id,
        });
      if (!existedComment) throw new Error('Comment not found');
      return existedComment;
    } catch (error) {
      this.logger.error(`${error.message}`);
      throw new BadRequestException(error.message);
    }
  }

  async getPropertyCommentById(
    id: Prisma.Comment_PropertyWhereUniqueInput,
  ): Promise<Comment_Property> {
    try {
      const existedComment =
        await this.prismaService.comment_Property.findUnique({
          where: id,
        });
      if (!existedComment) throw new Error('Comment not found');
      return existedComment;
    } catch (error) {
      this.logger.error(`${error.message}`);
      throw new BadRequestException(error.message);
    }
  }

  /// get all comments
  async getAllBrokerComments(data: any): Promise<Comment_BrokerCustom> {
    try {
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
    } catch (error) {
      this.logger.error(`${error.message}`);
      throw new BadRequestException(error.message);
    }
  }

  async getAllCompanyComments(data: any): Promise<Comment_CompanyCustom> {
    try {
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
    } catch (error) {
      this.logger.error(`${error.message}`);
      throw new BadRequestException(error.message);
    }
  }

  async getAllProjectComments(data: any): Promise<Comment_ProjectCustom> {
    try {
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
    } catch (error) {
      this.logger.error(`${error.message}`);
      throw new BadRequestException(error.message);
    }
  }

  async getAllPropertyComments(data: any): Promise<Comment_PropertyCustom> {
    try {
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
    } catch (error) {
      this.logger.error(`${error.message}`);
      throw new BadRequestException(error.message);
    }
  }

  ///update comment by id
  async updateBrokerComment(
    user: any,
    where: Prisma.Comment_BrokerWhereUniqueInput,
    data: UpdateCommentDto,
  ): Promise<Comment_Broker> {
    try {
      const existedComment = await this.getBrokerCommentById(where);
      this.checkCommenIsUser(existedComment, user);
      const comment = await this.prismaService.comment_Broker.update({
        data,
        where,
      });
      return comment;
    } catch (error) {
      this.logger.error(`${error.message}`);
      throw new BadRequestException(error.message);
    }
  }

  async updateCompanyComment(
    user: any,
    where: Prisma.Comment_CompanyWhereUniqueInput,
    data: UpdateCommentDto,
  ): Promise<Comment_Company> {
    try {
      const existedComment = await this.getCompanyCommentById(where);
      this.checkCommenIsUser(existedComment, user);
      const comment = await this.prismaService.comment_Company.update({
        data,
        where,
      });
      return comment;
    } catch (error) {
      this.logger.error(`${error.message}`);
      throw new BadRequestException(error.message);
    }
  }

  async updateProjectComment(
    user: any,
    where: Prisma.Comment_ProjectWhereUniqueInput,
    data: UpdateCommentDto,
  ): Promise<Comment_Project> {
    try {
      const existedComment = await this.getProjectCommentById(where);
      this.checkCommenIsUser(existedComment, user);
      const comment = await this.prismaService.comment_Project.update({
        data,
        where,
      });
      return comment;
    } catch (error) {
      this.logger.error(`${error.message}`);
      throw new BadRequestException(error.message);
    }
  }

  async updatePropertyComment(
    user: any,
    where: Prisma.Comment_PropertyWhereUniqueInput,
    data: UpdateCommentDto,
  ): Promise<Comment_Property> {
    try {
      const existedComment = await this.getPropertyCommentById(where);
      this.checkCommenIsUser(existedComment, user);
      const comment = await this.prismaService.comment_Property.update({
        data,
        where,
      });
      return comment;
    } catch (error) {
      this.logger.error(`${error.message}`);
      throw new BadRequestException(error.message);
    }
  }

  ///delete comment by id
  async deleteBrokerCommentById(
    user: any,
    where: Prisma.Comment_BrokerWhereUniqueInput,
  ): Promise<any> {
    try {
      const existedComment = await this.getBrokerCommentById(where);

      this.checkCommenIsUser(existedComment, user);
      const result = await this.prismaService.comment_Broker.delete({ where });
      return result;
    } catch (error) {
      this.logger.error(`${error.message}`);
      throw new BadRequestException(error.message);
    }
  }

  async deleteCompanyCommentById(
    user: any,
    where: Prisma.Comment_CompanyWhereUniqueInput,
  ): Promise<any> {
    try {
      const existedComment = await this.getCompanyCommentById(where);

      this.checkCommenIsUser(existedComment, user);
      const result = await this.prismaService.comment_Company.delete({ where });
      return result;
    } catch (error) {
      this.logger.error(`${error.message}`);
      throw new BadRequestException(error.message);
    }
  }

  async deleteProjectCommentById(
    user: any,
    where: Prisma.Comment_ProjectWhereUniqueInput,
  ): Promise<any> {
    try {
      const existedComment = await this.getProjectCommentById(where);

      this.checkCommenIsUser(existedComment, user);
      const result = await this.prismaService.comment_Project.delete({ where });
      return result;
    } catch (error) {
      this.logger.error(`${error.message}`);
      throw new BadRequestException(error.message);
    }
  }

  async deletePropertyCommentById(
    user: any,
    where: Prisma.Comment_PropertyWhereUniqueInput,
  ): Promise<any> {
    try {
      const existedComment = await this.getPropertyCommentById(where);

      this.checkCommenIsUser(existedComment, user);
      const result = await this.prismaService.comment_Property.delete({
        where,
      });
      return result;
    } catch (error) {
      this.logger.error(`${error.message}`);
      throw new BadRequestException(error.message);
    }
  }

  checkCommenIsUser(existedComment, user) {
    if (!existedComment) throw new Error('Comment not found');
    if (existedComment.userId !== user.id) {
      throw new Error('This comment not that user');
    }
  }

  // async checkComment(id: string) {
  //   try {
  //     const check = await this.getBrokerCommentById({ id });
  //     return check;
  //   } catch (error) {
  //     if (error instanceof Prisma.PrismaClientKnownRequestError) {
  //       if (error.code === 'P2025') {
  //         throw new BadRequestException('Broker not found');
  //       }
  //     }
  //   }
  // }
}
