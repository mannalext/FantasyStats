import { createTeam } from '../../services/stats/teams/create-team';
import { Route, Controller, Post, Body, Middlewares, Get, Path } from 'tsoa';
import { TeamsErrorHandlingMiddleware } from './teams-error-handling-middleware';
import { findTeam } from '../../services/stats/teams/find-team';
import { Team } from '../../entities/team';
import { findTeamById } from '../../services/stats/teams/find-team-by-id';

@Route('teams')
@Middlewares(TeamsErrorHandlingMiddleware)
export class TeamsController extends Controller {
  @Get('{seasonId}/{ownerId}')
  public async findTeam(@Path() seasonId: number, @Path() ownerId: number): Promise<Team> {
    return await findTeam(seasonId, ownerId);
  }

  @Get('{teamId}')
  public async findTeamById(@Path() teamId: number): Promise<Team> {
    return await findTeamById(teamId);
  }

  @Post('')
  public async createTeam(@Body() body: { seasonId: number; ownerId: number }): Promise<number> {
    return await createTeam(body.seasonId, body.ownerId);
  }
}
