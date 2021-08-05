import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

import { PrismaService } from '../../prisma/prisma.service';
import { RequestWithUser } from '../interface/requestWithUser';
import { METHOD_GRAPH } from '../decorators/method-graph.decorator';

@Injectable()
export class IsBroker implements CanActivate {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly reflector: Reflector,
    private readonly logger: Logger,
  ) {}

  async compareBroker(
    brokerId: string,
    paramId: string,
    path: string,
  ): Promise<boolean> {
    let result: boolean = false;

    if (!(brokerId && paramId)) return false;

    switch (path) {
      case 'properties':
        const dataProp = await this.prismaService.brokerProperty
          .findFirst({
            where: {
              AND: [
                { brokerId: { contains: brokerId } },
                { propertyId: { contains: paramId } },
                { owner: { equals: true } },
              ],
            },
          })
          .catch((error) => {
            this.logger.error(error.message);
          });
        result = !!dataProp;
        break;

      case 'news':
        const dataNews = await this.prismaService.news.findFirst({
          where: {
            id: paramId,
            authorId: brokerId,
          },
        });
        result = !!dataNews;

      default:
        break;
    }

    return result;
  }

  handleGraphType(
    request: RequestWithUser,
    contextGraph: GqlExecutionContext,
    path: string,
    method: string,
  ): Promise<boolean> | boolean {
    const user = request.user;
    const { id } = contextGraph.switchToWs().getData();

    if (method === 'POST') return user.broker !== null;
    if (method === 'PUT' || method === 'PATCH')
      return this.compareBroker(user.broker?.id, id, path);
    if (method === 'DELETE')
      return this.compareBroker(user.broker?.id, id, path);

    this.logger.warn('"IsBroker Guard": Method not found in Graphql type ');
    return false;
  }

  handleHttpType(request: RequestWithUser): Promise<boolean> | boolean {
    const user = request.user;
    const method = request.method;
    const paramId = request.params.id;
    const path = request.url.split('/')[2]; /// /api/example/ -> path = "example"

    if (method === 'POST') return user.broker !== null;
    if (method === 'PUT' || method === 'PATCH')
      return this.compareBroker(user.broker?.id, paramId, path);
    if (method === 'DELETE')
      return this.compareBroker(user.broker?.id, paramId, path);

    this.logger.warn('"IsBroker Guard": Method not found in Http type');
    return false;
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const contextType: string = context.getType();
    let request: RequestWithUser;

    if (contextType === 'graphql') {
      const ctx = GqlExecutionContext.create(context);
      const { method, path } = this.reflector.get(
        METHOD_GRAPH,
        ctx.getHandler(),
      );

      request = ctx.getContext().req;
      return this.handleGraphType(request, ctx, path, method);
    }
    if (contextType === 'http') {
      request = context.switchToHttp().getRequest();
      return this.handleHttpType(request);
    }

    this.logger.warn('"IsBroker Guard": Context type not found');
    return false;
  }
}
