import { Season } from '../../entities/season';
import { Body, Controller, Get, Middlewares, Path, Post, Res, Route, TsoaResponse } from 'tsoa';
import { ErrorResponse } from '../error-message';
import { findSeasonById } from '../../services/stats/seasons/find-season-by-id';
import { findSeasonByLeagueAndYear } from '../../services/stats/seasons/find-season-by-league-and-year';
import { createSeason } from '../../services/stats/seasons/create-season';
import { SeasonErrorHandlingMiddleware } from './season-error-handling-middleware';

interface SingleSeasonResponse {
  season: Season | undefined;
}
@Route('seasons')
@Middlewares(SeasonErrorHandlingMiddleware)
export class SeasonsController extends Controller {
  @Get('{id}')
  public async findSeasonById(@Path() id: number): Promise<Season> {
    return await findSeasonById(id);
  }

  @Get('{leagueId}/{year}')
  public async findSeasonByLeagueAndYear(
    @Path() leagueId: number,
    @Path() year: number,
    @Res() notFoundResponse: TsoaResponse<404, ErrorResponse>
  ): Promise<SingleSeasonResponse> {
    const found: Season | undefined = await findSeasonByLeagueAndYear(leagueId, year);
    if (!found) {
      return notFoundResponse(404, {
        error: {
          message: 'No season found for that league and year',
        },
      });
    }
    return {
      season: found,
    };
  }

  @Post('')
  public async createSeason(@Body() body: { leagueId: number }): Promise<number> {
    return await createSeason(body.leagueId);
  }
}
