import { EntityAlreadyExistsError, EntityDoesNotExistError } from '../../services/errors';
import Router from 'koa-router';

export const SeasonErrorHandlingMiddleware = async (
  context: Router.IRouterContext,
  next: () => Promise<any>
): Promise<any> => {
  try {
    await next();
  } catch (error: any) {
    if (error instanceof EntityDoesNotExistError) {
      context.throw(error, 404);
    } else if (error instanceof EntityAlreadyExistsError) {
      context.throw(error, 400);
    }
    context.throw(error, 500);
  }
};
