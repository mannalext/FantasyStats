import { Season } from '../entities/season';
import { Body, Controller, Get, Path, Post, Res, Route, TsoaResponse } from 'tsoa';
import { ErrorResponse } from './error-message';
import { findSeasonById } from '../services/stats/seasons/find-season-by-id';
import { findSeasonByLeagueAndYear } from '../services/stats/seasons/find-season-by-league-and-year';
import { createSeason } from '../services/stats/seasons/create-season';

interface SingleSeasonResponse {
  season: Season | undefined;
}

@Route('seasons')
export class SeasonsController extends Controller {
  @Get('{id}')
  public async findSeasonById(
    @Path() id: number,
    @Res() notFoundResponse: TsoaResponse<404, ErrorResponse>
  ): Promise<SingleSeasonResponse> {
    const found: Season | undefined = await findSeasonById(id);
    if (!found) {
      return notFoundResponse(404, {
        error: {
          message: 'No season found for that id',
        },
      });
    }
    return {
      season: found,
    };
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
