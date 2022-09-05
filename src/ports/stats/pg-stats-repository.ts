import { League } from '@entities/league';
import { Owner } from '@entities/owner';
import { Season } from '@entities/season';
import { Team } from '@entities/team';
import { query } from '.';
import { StatsRepository } from './stats-repository';
import { isNumber } from '../../utilities/is-number';

export class PgStatsRepository implements StatsRepository {
  async createLeague(leagueName: string): Promise<number> {
    const queryResult = await query('INSERT INTO leagues (name) VALUES ($1) RETURNING id', [leagueName]);
    if (isNumber(queryResult.rows[0].id)) {
      return queryResult.rows[0].id;
    } else {
      throw new Error('Unexpected result from createLeague');
    }
  }

  async findLeagueById(leagueId: number): Promise<League | undefined> {
    const found = await query('SELECT * FROM leagues WHERE id=$1', [leagueId]);
    return found.rows.length > 0 ? (this.isLeague(found.rows[0]) ? found.rows[0] : undefined) : undefined;
  }

  createOwner(ownerName: string): Promise<Owner> {
    console.log(ownerName);
    // TODO: generate a UUID and send it in
    throw new Error('Method not implemented.');
  }
  findOwnerById(ownerId: string): Promise<Owner | undefined> {
    console.log(ownerId);
    throw new Error('Method not implemented.');
  }
  createSeason(seasonId: string, leagueId: number, year: number): Promise<Season> {
    console.log(seasonId, leagueId, year);
    throw new Error('Method not implemented.');
  }
  findSeasonById(seasonId: number): Promise<Season | undefined> {
    console.log(seasonId);
    throw new Error('Method not implemented.');
  }
  createTeam(seasonId: number, ownerId: string, wins: number, losses: number, ties: number): Promise<Team> {
    console.log(seasonId, ownerId, wins, losses, ties);
    throw new Error('Method not implemented.');
  }
  findTeam(seasonId: number, ownerId: string): Promise<Team | undefined> {
    console.log(seasonId, ownerId);
    throw new Error('Method not implemented.');
  }

  // privates

  private isLeague(result: League | unknown): result is League {
    return (result as League).name !== undefined && (result as League).id !== undefined;
  }
}
