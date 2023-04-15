import { EntityAlreadyExistsError, EntityDoesNotExistError } from '../../services/errors';
import * as Router from 'koa-router';

export const LeagueErrorHandlingMiddleware = async (
  context: Router.IRouterContext,
  next: () => Promise<any>
): Promise<any> => {
  try {
    await next();
  } catch (error: any) {
    if (error instanceof EntityDoesNotExistError || error instanceof EntityAlreadyExistsError) {
      context.throw(error, 404);
    }
    context.throw(error, 500);
  }
};
