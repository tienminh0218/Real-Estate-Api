import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

import { RequestWithUser, UserInterface } from '../interface/requestWithUser';

@Injectable()
export class IsUser implements CanActivate {
  compare(user: UserInterface, paramId: string, key: string): boolean {
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
    if (path === 'projects') return this.compare(user, paramId, 'companies');
    if (path === 'properties') return this.compare(user, paramId, 'projects');

    return false;
  }

  updateOrDeleteMethod(
    path: string,
    user: UserInterface,
    paramId: string,
  ): boolean {
    if (path === 'users') return user.id === paramId;
    if (path === 'companies') return this.compare(user, paramId, path);
    if (path === 'projects') return this.compare(user, paramId, path);
    if (path === 'properties') return this.compare(user, paramId, path);

    return false;
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: RequestWithUser = context.switchToHttp().getRequest();
    const user = request.user;

    if (user.role === 'ADMIN') return true;

    const paramId = request.params.id;
    const path = request.url.split('/')[2]; /// /api/example/ -> path = "example"
    const method = request.method;

    if (method === 'POST') return this.postMethod(path, user, paramId);
    if (method === 'PUT' || method === 'PATCH' || method === 'DELETE')
      return this.updateOrDeleteMethod(path, user, paramId);
  }
}
