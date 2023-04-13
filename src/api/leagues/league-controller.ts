import { Body, Controller, Get, Middlewares, Path, Post, Route } from 'tsoa';
import { createLeague } from '../../services/stats/leagues/create-league';
import { findLeagueById } from '../../services/stats/leagues/find-league-by-id';
import { League } from '../../entities/league';
import { LeagueErrorHandlingMiddleware } from './league-error-handling-middleware';
// import { ErrorResponse } from '../error-message';
// import { LeagueErrorHandlingMiddleware } from './league-error-handling-middleware';

interface SingleLeagueResponse {
  league: League | undefined;
}

@Route('leagues')
@Middlewares(LeagueErrorHandlingMiddleware)
export class LeaguesController extends Controller {
  @Get('{id}')
  public async findLeagueById(
    @Path() id: number
    // @Res() notFoundResponse: TsoaResponse<404, ErrorResponse>
  ): Promise<SingleLeagueResponse> {
    // throw new Error('hmm');
    const found = await findLeagueById(id);
    // if (!found) {
    //   return notFoundResponse(404, {
    //     error: {
    //       message: 'No league found for that id',
    //     },
    //   });
    // }
    return {
      league: found,
    };
  }

  @Post('')
  public async createLeague(@Body() body: { leagueName: string }): Promise<number> {
    return await createLeague(body.leagueName);
    // TODO: this needs to return something once I figure out how to get the return from the insert statement
  }
}
