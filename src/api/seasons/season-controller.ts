import { Season } from '../../entities/season';
import { Body, Controller, Get, Middlewares, Path, Post, Route } from 'tsoa';
import { findSeasonById } from '../../services/stats/seasons/find-season-by-id';
import { findSeasonByLeagueAndYear } from '../../services/stats/seasons/find-season-by-league-and-year';
import { createSeason } from '../../services/stats/seasons/create-season';
import { SeasonErrorHandlingMiddleware } from './season-error-handling-middleware';
import { createSleeperSeason } from '@services/stats/seasons/sleeperSeasons/create-sleeper-season';

@Route('seasons')
@Middlewares(SeasonErrorHandlingMiddleware)
export class SeasonsController extends Controller {
  @Get('{id}')
  public async findSeasonById(@Path() id: number): Promise<Season> {
    return await findSeasonById(id);
  }

  @Get('{leagueId}/{year}')
  public async findSeasonByLeagueAndYear(@Path() leagueId: number, @Path() year: number): Promise<Season> {
    return await findSeasonByLeagueAndYear(leagueId, year);
  }

  @Post('')
  public async createSeason(@Body() body: { leagueId: number }): Promise<number> {
    return await createSeason(body.leagueId);
  }

  @Post('sleeper/{leagueId}')
  public async createSleeperSeason(@Path() leagueId: number, @Body() sleeperLeagueId: string): Promise<number> {
    return await createSleeperSeason(leagueId, sleeperLeagueId);
  }
}
