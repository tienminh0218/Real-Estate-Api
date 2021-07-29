import { SetMetadata } from '@nestjs/common';

export enum Methods {
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export enum Paths {
  USER = 'users',
  PROJECT = 'projects',
  NEWS = 'news',
  COMMENT = 'comment',
  AUTH = 'auth',
  COMPANY = 'companies',
  PROPERTY = 'properties',
  BROKER = 'broker',
  CATEGORY = 'category',
}

export const METHOD_GRAPH: string = 'methodGraph';
export const Method = (method: Methods, path: Paths) =>
  SetMetadata(METHOD_GRAPH, { method, path });
