import { League, LeagueEntity } from '@entities/league';
import { Owner, OwnerEntity } from '@entities/owner';
import { Season } from '@entities/season';
import { Team } from '@entities/team';
import { query } from '.';
import { StatsRepository } from './stats-repository';
import { isNumber } from '../../utilities/is-number';
import { QueryResult } from 'pg';
import { LeagueDoesNotExistError } from '../../services/stats/leagues/leagues-validators';

interface PostgresConstraintError extends Error {
  code: string;
  constraint?: string;
}

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
    if (found.rows.length > 0) {
      if (this.isLeagueEntity(found.rows[0])) {
        return found.rows[0];
      } else {
        throw new Error('Unexpected result from findLeagueById');
      }
    } else {
      throw new LeagueDoesNotExistError('No league found for that id');
    }
  }

  async createSeason(leagueId: number): Promise<number> {
    let queryResult;
    try {
      queryResult = await query(
        `
          INSERT INTO seasons
          (league_id, year)
          VALUES ($1, $2)
          RETURNING id
        `,
        [leagueId, new Date().getFullYear()]
      );
    } catch (error) {
      const error_ =
        this.isPostgresConstraintError(error) && error.code === '23505' && error.constraint === 'seasons_pkey'
          ? new Error('A season already exists for this league and year')
          : error;
      throw error_;
    }

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

  async createOwner(ownerName: string): Promise<number> {
    const queryResult = await query('insert into owners (display_name) values ($1) returning id', [ownerName]);
    if (isNumber(queryResult.rows[0].id)) {
      return queryResult.rows[0].id;
    } else {
      throw new Error('Unexpected result from createOwner');
    }
  }

  async findOwnerById(ownerId: number): Promise<Owner | undefined> {
    const found: QueryResult = await query('select * from owners where id=$1', [ownerId]);
    const ownerEntity: OwnerEntity = found.rows[0];

    return ownerEntity ? this.convertOwnerEntityToOwner(ownerEntity) : undefined;
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

  private isLeagueEntity(result: LeagueEntity | unknown): result is LeagueEntity {
    return (result as LeagueEntity).name !== undefined && (result as LeagueEntity).id !== undefined;
  }

  private isSeason(result: Season | unknown): result is Season {
    return (
      (result as Season).id !== undefined &&
      (result as Season).leagueId !== undefined &&
      (result as Season).year !== undefined
    );
  }

  private isPostgresConstraintError(error: unknown): error is PostgresConstraintError {
    return (
      error instanceof Error &&
      'code' in error &&
      typeof (error as PostgresConstraintError).code === 'string' &&
      'constraint' in error &&
      (typeof (error as PostgresConstraintError).constraint === 'string' ||
        (error as PostgresConstraintError).constraint === undefined)
    );
  }

  private convertOwnerEntityToOwner(ownerEntity: OwnerEntity): Owner {
    return {
      id: ownerEntity.id,
      name: ownerEntity.display_name,
    };
  }
}
