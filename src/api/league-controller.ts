import { Body, Controller, Get, Path, Post, Res, Route, TsoaResponse } from 'tsoa';
import { ErrorResponse } from './error-message';
import { League } from '../entities/league';
import { findLeagueById } from '../services/stats/find-league-by-id';
import { createLeague } from '../services/stats/create-league';

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
    console.log(found);
    if (!found) {
      return notFoundResponse(404, {
        error: {
          message: 'No league found for that id',
        },
      });
    }
    return {
      league: found
    };
  }

  @Post('')
  public async createLeague(
    @Body() body: { leagueName: string }
  ): Promise<void> {
    await createLeague(body.leagueName);
    // TODO: this needs to return something once I figure out how to get the return from the insert statement
  }
}