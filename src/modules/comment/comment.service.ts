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
import { CreateCommentDto } from './dto/create-comment.dto';
import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentRepository } from './repositories/comment.repository';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly logger: Logger,
  ) {}

  ///Create comment
  async createBrokerComment(
    user: any,
    data: CreateCommentDto,
    brokerId: string,
  ) {
    try {
      return this.commentRepository.createBrokerComment(user, data, brokerId);
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
      return this.commentRepository.createCompanyComment(user, data, companyId);
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
      return this.commentRepository.createProjectComment(user, data, projectId);
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
      return this.commentRepository.createPropertyComment(
        user,
        data,
        propertyId,
      );
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
      return this.commentRepository.getBrokerCommentById(id);
    } catch (error) {
      this.logger.error(`${error.message}`);
      throw new BadRequestException(error.message);
    }
  }

  async getCompanyCommentById(
    id: Prisma.Comment_CompanyWhereUniqueInput,
  ): Promise<Comment_Company> {
    try {
      return this.commentRepository.getCompanyCommentById(id);
    } catch (error) {
      this.logger.error(`${error.message}`);
      throw new BadRequestException(error.message);
    }
  }

  async getProjectCommentById(
    id: Prisma.Comment_ProjectWhereUniqueInput,
  ): Promise<Comment_Project> {
    try {
      return this.commentRepository.getProjectCommentById(id);
    } catch (error) {
      this.logger.error(`${error.message}`);
      throw new BadRequestException(error.message);
    }
  }

  async getPropertyCommentById(
    id: Prisma.Comment_PropertyWhereUniqueInput,
  ): Promise<Comment_Property> {
    try {
      return this.commentRepository.getPropertyCommentById(id);
    } catch (error) {
      this.logger.error(`${error.message}`);
      throw new BadRequestException(error.message);
    }
  }

  /// get all comments
  async getAllBrokerComments(data: any): Promise<Comment_BrokerCustom> {
    try {
      return this.commentRepository.getAllBrokerComments(data);
    } catch (error) {
      this.logger.error(`${error.message}`);
      throw new BadRequestException(error.message);
    }
  }

  async getAllCompanyComments(data: any): Promise<Comment_CompanyCustom> {
    try {
      return this.commentRepository.getAllCompanyComments(data);
    } catch (error) {
      this.logger.error(`${error.message}`);
      throw new BadRequestException(error.message);
    }
  }

  async getAllProjectComments(data: any): Promise<Comment_ProjectCustom> {
    try {
      return this.commentRepository.getAllProjectComments(data);
    } catch (error) {
      this.logger.error(`${error.message}`);
      throw new BadRequestException(error.message);
    }
  }

  async getAllPropertyComments(data: any): Promise<Comment_PropertyCustom> {
    try {
      return this.commentRepository.getAllPropertyComments(data);
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
      return this.commentRepository.updateBrokerComment(user, where, data);
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
      return this.commentRepository.updateCompanyComment(user, where, data);
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
      return this.commentRepository.updateProjectComment(user, where, data);
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
      return this.commentRepository.updatePropertyComment(user, where, data);
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
      return this.commentRepository.deleteBrokerCommentById(user, where);
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
      return this.commentRepository.deleteCompanyCommentById(user, where);
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
      return this.commentRepository.deleteProjectCommentById(user, where);
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
      return this.commentRepository.deletePropertyCommentById(user, where);
    } catch (error) {
      this.logger.error(`${error.message}`);
      throw new BadRequestException(error.message);
    }
  }
}
