import { Field, ObjectType } from '@nestjs/graphql';
import { Project } from '@prisma/client';
import { PaginationType } from '../../../common/types/pagination.type';
import { Project as Projectgraphql } from './graph-model.type';

@ObjectType()
export class ProjectCustom {
  @Field((type) => [Projectgraphql])
  data: Project[];

  @Field((type) => PaginationType)
  pagination: PaginationType;
}
