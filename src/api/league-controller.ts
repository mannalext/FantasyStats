import { Controller, Get, Path, Res, Route, TsoaResponse } from 'tsoa';
import { ErrorResponse } from './error-message';
import { League } from '../entities/league';
import { findLeagueById } from '../services/stats/find-league-by-id';

interface SingleLeagueResponse {
  league: League;
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
      league: found
    };
  }
}