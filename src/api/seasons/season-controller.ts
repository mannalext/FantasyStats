import { Season, SleeperSeason } from '../../entities/season';
import { Body, Controller, Get, Middlewares, Path, Post, Route } from 'tsoa';
import { findSeasonById } from '../../services/stats/seasons/find-season-by-id';
import { findSeasonByLeagueAndYear } from '../../services/stats/seasons/find-season-by-league-and-year';
import { createSeason } from '../../services/stats/seasons/create-season';
import { SeasonErrorHandlingMiddleware } from './season-error-handling-middleware';
import { createSleeperSeason } from '../../services/stats/seasons/sleeperSeasons/create-sleeper-season';
import { findSleeperSeasonBySleeperLeagueId } from '../../services/stats/seasons/sleeperSeasons/find-sleeper-season-by-sleeper-league-id';
import { findSleeperSeasonBySeasonId } from '../../services/stats/seasons/sleeperSeasons/find-sleeper-season-by-season-id';

@Route('seasons')
@Middlewares(SeasonErrorHandlingMiddleware)
export class SeasonsController extends Controller {
  @Post('sleeper')
  public async createSleeperSeason(@Body() body: { leagueId: number; sleeperLeagueId: string }): Promise<number> {
    return await createSleeperSeason(body.leagueId, body.sleeperLeagueId);
  }

  @Get('sleeper/{seasonId}')
  public async findSleeperSeasonBySeasonId(@Path() seasonId: number): Promise<SleeperSeason> {
    return await findSleeperSeasonBySeasonId(seasonId);
  }

  @Get('sleeper/external-id/{sleeperLeagueId}')
  public async findSleeperSeasonBySleeperLeagueId(@Path() sleeperLeagueId: string): Promise<SleeperSeason> {
    return await findSleeperSeasonBySleeperLeagueId(sleeperLeagueId);
  }

  @Get('{id}')
  public async findSeasonById(@Path() id: number): Promise<Season> {
    return await findSeasonById(id);
  }

  @Get('base/{leagueId}/{year}')
  public async findSeasonByLeagueAndYear(@Path() leagueId: number, @Path() year: number): Promise<Season> {
    return await findSeasonByLeagueAndYear(leagueId, year);
  }

  @Post('')
  public async createSeason(@Body() body: { leagueId: number }): Promise<number> {
    return await createSeason(body.leagueId);
  }
}
