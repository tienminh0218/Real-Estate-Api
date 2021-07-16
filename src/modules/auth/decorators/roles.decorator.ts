import { SetMetadata } from '@nestjs/common';

export enum RoleType {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export const ROLES_KEY: string = 'roles';

export const Roles = (...roles: RoleType[]) => SetMetadata(ROLES_KEY, roles);
