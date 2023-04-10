import { Body, Controller, Get, Path, Post, Res, Route, TsoaResponse } from 'tsoa';
import { createLeague } from '../services/stats/leagues/create-league';
import { findLeagueById } from '../services/stats/leagues/find-league-by-id';
import { League } from '../entities/league';
import { ErrorResponse } from './error-message';

interface SingleLeagueResponse {
  league: League | undefined;
}

@Route('leagues')
export class LeaguesController extends Controller {
  @Get('{id}')
  public async findLeagueById(
    @Path() id: number,
    @Res() notFoundResponse: TsoaResponse<404, ErrorResponse>
  ): Promise<SingleLeagueResponse> {
    const found = await findLeagueById(id);
    if (!found) {
      return notFoundResponse(404, {
        error: {
          message: 'No league found for that id',
        },
      });
    }
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
