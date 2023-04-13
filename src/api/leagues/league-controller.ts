import { Body, Controller, Get, Middlewares, Path, Post, Route } from 'tsoa';
import { createLeague } from '../../services/stats/leagues/create-league';
import { findLeagueById } from '../../services/stats/leagues/find-league-by-id';
import { League } from '../../entities/league';
import { LeagueErrorHandlingMiddleware } from './league-error-handling-middleware';

@Route('leagues')
@Middlewares(LeagueErrorHandlingMiddleware)
export class LeaguesController extends Controller {
  @Get('{id}')
  public async findLeagueById(@Path() id: number): Promise<League> {
    return await findLeagueById(id);
  }

  @Post('')
  public async createLeague(@Body() body: { leagueName: string }): Promise<number> {
    return await createLeague(body.leagueName);
  }
}
