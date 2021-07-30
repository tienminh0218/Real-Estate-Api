import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Reflector } from '@nestjs/core';

import { RequestWithUser, UserInterface } from '../interface/requestWithUser';
import { Role } from '../decorators/roles.decorator';
import { METHOD_GRAPH } from '../decorators/method-graph.decorator';

@Injectable()
export class IsUser implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly logger: Logger,
  ) {}

  compareUser(user: UserInterface, paramId: string, key: string): boolean {
    let result: boolean = false;

    switch (key) {
      case 'companies':
        result = user.companies?.some((company) => company.id === paramId);
        break;
      case 'projects':
        result = user.companies?.some((company) =>
          company.projects?.some((project) => project.id === paramId),
        );
        break;
      case 'properties':
        result = user.companies?.some((company) =>
          company.projects?.some((project) =>
            project.properties?.some((property) => property.id === paramId),
          ),
        );
        break;

      default:
        break;
    }

    return result;
  }

  postMethod(path: string, user: UserInterface, paramId: string): boolean {
    if (path === 'projects')
      return this.compareUser(user, paramId, 'companies');
    if (path === 'properties') {
      return this.compareUser(user, paramId, 'projects');
    }

    this.logger.warn('Path not found');
    return false;
  }

  updateOrDeleteMethod(
    path: string,
    user: UserInterface,
    paramId: string,
  ): boolean {
    if (path === 'users') return user.id === paramId;
    if (path === 'companies') return this.compareUser(user, paramId, path);
    if (path === 'projects') return this.compareUser(user, paramId, path);
    if (path === 'properties') return this.compareUser(user, paramId, path);

    this.logger.warn('Path not found');
    return false;
  }

  handleGraphType(
    request: RequestWithUser,
    contextGraph: GqlExecutionContext,
    path: string,
    method: string,
  ): boolean {
    const { id } = contextGraph.switchToWs().getData();

    if (method === 'POST') return this.postMethod(path, request.user, id);
    if (method === 'PUT' || method === 'PATCH' || method === 'DELETE')
      return this.updateOrDeleteMethod(path, request.user, id);

    this.logger.warn('Method not found in Graphql type');
    return false;
  }

  handleHttpType(request: RequestWithUser): boolean {
    const user = request.user;
    const paramId = request.params.id;
    const path = request.url.split('/')[2]; /// /api/example/ -> path = "example"
    const method = request.method;

    if (method === 'POST') return this.postMethod(path, user, paramId);
    if (method === 'PUT' || method === 'PATCH' || method === 'DELETE')
      return this.updateOrDeleteMethod(path, user, paramId);

    this.logger.warn('Method not found in Http type');
    return false;
  }

  isAdmin(request: RequestWithUser): boolean {
    return request.user.role === Role.ADMIN;
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

      return (
        this.isAdmin(request) ||
        this.handleGraphType(request, ctx, path, method)
      );
    }
    if (contextType === 'http') {
      request = context.switchToHttp().getRequest();
      return this.isAdmin(request) || this.handleHttpType(request);
    }

    this.logger.warn('Context type not found');
    return false;
  }
}
