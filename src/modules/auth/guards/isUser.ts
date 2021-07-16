import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

import { RequestWithUser } from '../interface/requestWithUser';

@Injectable()
export class UserIsUserGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: RequestWithUser = context.switchToHttp().getRequest();
    const idParam = request.params.id;
    const user = request.user;

    return user.id === idParam;
  }
}
