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

  async createSeason(leagueId: number): Promise<number> {
    const queryResult = await query(
      `
        INSERT INTO seasons
        (league_id, year)
        VALUES ($1, $2)
        RETURNING id
      `,
      [leagueId, new Date().getFullYear()]
    );

    if (isNumber(queryResult.rows[0].id)) {
      return queryResult.rows[0].id;
    } else {
      throw new Error('Unexpected result from createSeason'); // TODO: make sure that trying to create a second season for a league, year pair fails
    }
  }

  async findSeasonById(seasonId: number): Promise<Season | undefined> {
    const found = await query(
      `
        select id, league_id::int as "leagueId", year
        from seasons
        where id=$1
      `,
      [seasonId]
    );

    return found.rows.length > 0 ? (this.isSeason(found.rows[0]) ? found.rows[0] : undefined) : undefined;
  }

  async findSeasonByLeagueAndYear(leagueId: number, year: number): Promise<Season | undefined> {
    const found = await query(
      `
        select id, league_id::int as "leagueId", year
        from seasons
        where league_id=$1
        and year=$2
      `,
      [leagueId, year]
    );

    return found.rows.length > 0 ? (this.isSeason(found.rows[0]) ? found.rows[0] : undefined) : undefined;
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

  private isSeason(result: Season | unknown): result is Season {
    return (
      (result as Season).id !== undefined &&
      (result as Season).leagueId !== undefined &&
      (result as Season).year !== undefined
    );
  }
}
