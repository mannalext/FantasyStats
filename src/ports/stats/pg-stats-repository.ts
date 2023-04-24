import { League } from '@entities/league';
import { Owner } from '@entities/owner';
import { Season } from '@entities/season';
import { Team } from '@entities/team';
import prisma from '.';
import { StatsRepository } from './stats-repository';
import { SleeperLeague } from '@entities/sleeper/sleeper-league';

export class PgStatsRepository implements StatsRepository {
  async createLeague(leagueName: string): Promise<number> {
    const result = await prisma.leagues.create({
      data: {
        name: leagueName,
      },
      select: { id: true },
    });

    return result.id;
  }

  async findLeagueById(leagueId: number): Promise<League> {
    const result: League = await prisma.leagues.findUniqueOrThrow({
      // TODO: does this return stuff like the 'seasons' and '_count' on the prisma object, or just the League?
      where: { id: leagueId },
    });

    return result;
  }

  async doesLeagueExist(leagueId: number): Promise<boolean> {
    const result: League | null = await prisma.leagues.findUnique({
      where: { id: leagueId },
    });

    return !!result;
  }

  async createSeason(leagueId: number): Promise<number> {
    const result = await prisma.seasons.create({
      data: {
        leagueId,
        sleeperLeagueId: '',
        year: new Date().getFullYear(),
      },
      select: { id: true },
    });

    return result.id;
  }

  async findSeasonById(seasonId: number): Promise<Season> {
    const result: Season = await prisma.seasons.findUniqueOrThrow({
      where: { id: seasonId },
    });

    return result;
  }

  async findSeasonByLeagueAndYear(leagueId: number, year: number): Promise<Season> {
    const result: Season = await prisma.seasons.findUniqueOrThrow({
      where: { leagueId_year: { leagueId, year } },
    });

    return result;
  }

  async doesSeasonExistByLeagueId(leagueId: number): Promise<boolean> {
    const result: Season | null = await prisma.seasons.findUnique({
      where: { leagueId_year: { leagueId, year: new Date().getFullYear() } },
    });

    return !!result;
  }

  async doesSeasonExistBySeasonId(seasonId: number): Promise<boolean> {
    const result: Season | null = await prisma.seasons.findUnique({
      where: { id: seasonId },
    });

    return !!result;
  }

  async createOwner(ownerName: string): Promise<number> {
    const result = await prisma.owners.create({
      data: {
        displayName: ownerName,
      },
      select: { id: true },
    });

    return result.id;
  }

  async findOwnerById(ownerId: number): Promise<Owner> {
    const result: Owner = await prisma.owners.findUniqueOrThrow({
      where: { id: ownerId },
    });

    return result;
  }

  async doesOwnerExist(ownerId: number): Promise<boolean> {
    const result: Owner | null = await prisma.owners.findUnique({
      where: { id: ownerId },
    });

    return !!result;
  }

  async createTeam(seasonId: number, ownerId: number): Promise<number> {
    const result = await prisma.teams.create({
      data: {
        seasonId,
        ownerId,
      },
      select: { id: true },
    });

    return result.id;
  }

  // TODO: findTeamById
  async findTeamById(teamId: number): Promise<Team> {
    const result: Team = await prisma.teams.findUniqueOrThrow({
      where: { id: teamId },
    });

    return result;
  }

  async findTeam(seasonId: number, ownerId: number): Promise<Team> {
    const result: Team = await prisma.teams.findUniqueOrThrow({
      where: { seasonId_ownerId: { seasonId, ownerId } },
    });

    return result;
  }

  async doesTeamExist(seasonId: number, ownerId: number): Promise<boolean> {
    const result: Team | null = await prisma.teams.findUnique({
      where: { seasonId_ownerId: { seasonId, ownerId } },
    });

    return !!result;
  }

  async doesTeamExistById(teamId: number): Promise<boolean> {
    const result: Team | null = await prisma.teams.findUnique({
      where: { id: teamId },
    });

    return !!result;
  }

  async saveSleeperLeague(sleeperLeague: SleeperLeague): Promise<void> {
    console.log(sleeperLeague);
    // TODO: save sleeperLeague to a new schema for it
  }
}
