import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

import { ROLES_KEY } from '../decorators/roles.decorator';
import { RequestWithUser } from '../interface/requestWithUser';
import { matchRoles } from '../../../utils/match-roles';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>(ROLES_KEY, context.getHandler());
    const contextType: string = context.getType();
    let request: RequestWithUser;

    if (!roles) return true;
    if (contextType === 'http') request = context.switchToHttp().getRequest();
    if (contextType === 'graphql') {
      const contextGraph = GqlExecutionContext.create(context);
      request = contextGraph.getContext().req;
    }

    const user = request.user;
    return user && matchRoles(roles, user.role);
  }
}
