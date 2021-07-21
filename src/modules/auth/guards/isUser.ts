import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

import { RequestWithUser, UserCustom } from '../interface/requestWithUser';

@Injectable()
export class IsUser implements CanActivate {
  postMethod(path: string, user: UserCustom, paramId: string) {
    if (path === 'projects')
      return user?.companies.some((company) => company.id === paramId);

    if (path === 'properties')
      return user?.companies.some((company) =>
        company.projects.some((project) => project.id === paramId),
      );

    return false;
  }

  putMethod(path: string, user: UserCustom, paramId: string) {
    if (path === 'users') return user.id === paramId;

    if (path === 'companies')
      return user?.companies?.some((company) => company.id === paramId);

    if (path === 'projects')
      return user?.companies?.some((company) =>
        company.projects?.some((project) => project.id === paramId),
      );

    if (path === 'properties')
      return user?.companies?.some((company) =>
        company.projects?.some((project) =>
          project.properties?.some((prop) => prop.id === paramId),
        ),
      );

    return false;
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: RequestWithUser = context.switchToHttp().getRequest();

    const user = request.user;
    if (user.role === 'ADMIN') return true;

    const paramId = request.params.id;
    const path = request.url.split('/')[2];

    const method = request.method;

    if (method === 'PUT') return this.putMethod(path, user, paramId);

    if (method === 'POST') return this.postMethod(path, user, paramId);
  }
}
