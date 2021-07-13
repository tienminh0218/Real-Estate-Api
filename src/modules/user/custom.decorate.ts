import { createParamDecorator } from '@nestjs/common';
import { convertBooleanObject } from '../../utils/optional-query';

export const QueryOpt = createParamDecorator((data: string, req) => {
  req.query = convertBooleanObject(req.args[0].query);

  return data ? req.query?.[data] : req.query;
});
