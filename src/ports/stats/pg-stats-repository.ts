import { League, LeagueEntity } from '@entities/league';
import { Owner, OwnerEntity } from '@entities/owner';
import { Season, SeasonEntity } from '@entities/season';
import { Team } from '@entities/team';
import { query } from '.';
import { StatsRepository } from './stats-repository';
import { isNumber } from '../../utilities/is-number';
import { QueryResult } from 'pg';

export class PgStatsRepository implements StatsRepository {
  async createLeague(leagueName: string): Promise<number> {
    const queryResult = await query('INSERT INTO leagues (name) VALUES ($1) RETURNING id', [leagueName]);
    if (isNumber(queryResult.rows[0].id)) {
      return queryResult.rows[0].id;
    } else {
      throw new Error('Unexpected result from createLeague');
    }
  }

  // TODO: slim down this function when we get an ORM implemented
  async findLeagueById(leagueId: number): Promise<League> {
    const found = await query('SELECT * FROM leagues WHERE id=$1', [leagueId]);
    if (this.isLeagueEntity(found.rows[0])) {
      return found.rows[0];
    } else {
      throw new Error('Unexpected result from findLeagueById');
    }
  }

  async doesLeagueExist(leagueId: number): Promise<boolean> {
    const found = await query('SELECT * FROM leagues WHERE id=$1', [leagueId]);
    return found.rows.length > 0;
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
      throw new Error('Unexpected result from createSeason');
    }
  }

  async findSeasonById(seasonId: number): Promise<Season> {
    const found = await query(
      `
        select id, league_id::int as "leagueId", year
        from seasons
        where id=$1
      `,
      [seasonId]
    );
    if (this.isSeasonEntity(found.rows[0])) {
      return found.rows[0];
    } else {
      throw new Error('Unexpected result from findSeasonById');
    }
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

    return found.rows.length > 0 ? (this.isSeasonEntity(found.rows[0]) ? found.rows[0] : undefined) : undefined;
  }

  async doesSeasonExist(leagueId: number): Promise<boolean> {
    const found = await query(
      `
        SELECT * FROM seasons
        WHERE league_id=$1
        AND year=$2
      `,
      [leagueId, new Date().getFullYear()]
    );
    return found.rows.length > 0;
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

  // TODO: this type guard likely goes away when we get an ORM
  private isLeagueEntity(result: LeagueEntity | unknown): result is LeagueEntity {
    return (result as LeagueEntity).name !== undefined && (result as LeagueEntity).id !== undefined;
  }

  private isSeasonEntity(result: SeasonEntity | unknown): result is SeasonEntity {
    return (
      (result as SeasonEntity).id !== undefined &&
      (result as SeasonEntity).leagueId !== undefined &&
      (result as SeasonEntity).year !== undefined
    );
  }

  private convertOwnerEntityToOwner(ownerEntity: OwnerEntity): Owner {
    return {
      id: ownerEntity.id,
      name: ownerEntity.display_name,
    };
  }
}
