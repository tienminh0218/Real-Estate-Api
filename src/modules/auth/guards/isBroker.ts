import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Observable } from 'rxjs';

import { RequestWithUser } from '../interface/requestWithUser';
import { Role } from '../decorators/roles.decorator';

@Injectable()
export class IsBroker implements CanActivate {
  constructor(private readonly prismaService: PrismaService) {}

  async compareBroker(
    brokerId: string,
    paramId: string,
    path: string,
  ): Promise<boolean> {
    let result: boolean = false;

    switch (path) {
      case 'properties':
        const dataProp = await this.prismaService.brokerProperty.findFirst({
          where: {
            brokerId,
            propertyId: paramId,
            owner: true,
          },
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

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: RequestWithUser = context.switchToHttp().getRequest();
    const user = request.user;

    if (user.role === Role.ADMIN) return true;
    if (!user.broker) return false;

    const method = request.method;
    const paramId = request.params.id;
    const path = request.url.split('/')[2]; /// /api/example/ -> path = "example"

    if (method === 'POST') return user.broker !== null;
    if (method === 'PUT' || method === 'PATCH')
      return this.compareBroker(user.broker.id, paramId, path);
    if (method === 'DELETE')
      return this.compareBroker(user.broker.id, paramId, path);
  }
}
