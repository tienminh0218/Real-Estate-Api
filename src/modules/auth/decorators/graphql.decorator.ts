import { SetMetadata } from '@nestjs/common';

export const IS_GRAPHQL = 'isGraphQL';
export const GraphQL = () => SetMetadata(IS_GRAPHQL, true);
