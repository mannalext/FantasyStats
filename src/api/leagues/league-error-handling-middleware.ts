import * as Router from 'koa-router';

export const LeagueErrorHandlingMiddleware = async (
  context: Router.IRouterContext,
  next: () => Promise<any>
): Promise<any> => {
  try {
    console.log('what');
    await next();
  } catch (error: any) {
    console.log('how');
    // if (error instanceof TooManyTiersError || error instanceof PriceTooLowError) {
    //   ctx.throw(error, 400);
    // } else if (error instanceof UserNotAuthorizedError) {
    //   ctx.throw(error, 403);
    // } else if (error instanceof TierDoesNotExistError) {
    //   ctx.throw(error, 404);
    // }
    context.throw(error, 500);
  }
};
