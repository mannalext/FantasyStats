import { League, LeagueEntity } from '@entities/league';
import { Owner, OwnerEntity } from '@entities/owner';
import { Season, SeasonEntity } from '@entities/season';
import { Team } from '@entities/team';
import { query } from '.';
import prisma from '.';
import { StatsRepository } from './stats-repository';
import { isNumber } from '../../utilities/is-number';
import { QueryResult } from 'pg';

export class PgStatsRepository implements StatsRepository {
  async createLeague(leagueName: string): Promise<number> {
    const result = await prisma.leagues.create({
      data: {
        name: leagueName,
      },
      select: { id: true }, // TODO: figure out why I can't use a Prisma.leaguesSelect here. posted a discussion to the Prisma github
    });

    return result.id;
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

  async findSeasonByLeagueAndYear(leagueId: number, year: number): Promise<Season> {
    const found = await query(
      `
        select id, league_id::int as "leagueId", year
        from seasons
        where league_id=$1
        and year=$2
      `,
      [leagueId, year]
    );

    if (this.isSeasonEntity(found.rows[0])) {
      return found.rows[0];
    } else {
      throw new Error('Unexpected result from findSeasonByLeagueAndYear');
    }
  }

  async doesSeasonExistByLeagueId(leagueId: number): Promise<boolean> {
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

  async doesSeasonExistBySeasonId(seasonId: number): Promise<boolean> {
    const found = await query(
      `
        SELECT * FROM seasons
        WHERE id=$1
      `,
      [seasonId]
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

  async findOwnerById(ownerId: number): Promise<Owner> {
    const found: QueryResult = await query('select * from owners where id=$1', [ownerId]);
    const ownerEntity: OwnerEntity = found.rows[0];

    return this.convertOwnerEntityToOwner(ownerEntity);
  }

  async doesOwnerExist(ownerId: number): Promise<boolean> {
    const found = await query('select * from owners where id=$1', [ownerId]);
    return found.rows.length > 0;
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
