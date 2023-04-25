import { League } from '@entities/league';
import { Owner } from '@entities/owner';
import { Season } from '@entities/season';
import { Team } from '@entities/team';
import { StatsRepository } from './stats-repository';
import { SleeperLeague } from '@entities/sleeper/sleeper-league';

export class InMemoryStatsRepository implements StatsRepository {
  private leagues: League[];
  private static leagueIdCounter = 1;

  constructor() {
    this.leagues = [];
  }

  async createLeague(leagueName: string): Promise<number> {
    const league: League = {
      name: leagueName,
      id: InMemoryStatsRepository.leagueIdCounter,
    };

    this.leagues.push(league);

    InMemoryStatsRepository.leagueIdCounter++;

    return league.id;
  }

  async findLeagueById(leagueId: number): Promise<League> {
    console.log(leagueId);
    throw new Error('Method not implemented.');
  }

  doesLeagueExist(leagueId: number): Promise<boolean> {
    console.log(leagueId);
    throw new Error('Method not implemented.');
  }

  async createOwner(ownerName: string): Promise<number> {
    console.log(ownerName);
    throw new Error('Method not implemented.');
  }

  async findOwnerById(ownerId: number): Promise<Owner> {
    console.log(ownerId);
    throw new Error('Method not implemented.');
  }

  doesOwnerExist(ownerId: number): Promise<boolean> {
    console.log(ownerId);
    throw new Error('Method not implemented.');
  }

  async createSeason(leagueId: number): Promise<number> {
    console.log(leagueId);
    throw new Error('Method not implemented.');
  }

  doesSeasonExistByLeagueId(leagueId: number): Promise<boolean> {
    console.log(leagueId);
    throw new Error('Method not implemented.');
  }

  doesSeasonExistBySeasonId(seasonId: number): Promise<boolean> {
    console.log(seasonId);
    throw new Error('Method not implemented.');
  }

  async findSeasonById(seasonId: number): Promise<Season> {
    console.log(seasonId);
    throw new Error('Method not implemented.');
  }

  async findSeasonByLeagueAndYear(leagueId: number, year: number): Promise<Season> {
    console.log(leagueId, year);
    throw new Error('Method not implemented.');
  }

  async createTeam(seasonId: number, ownerId: number): Promise<number> {
    console.log(seasonId);
    console.log(ownerId);
    throw new Error('Method not implemented.');
  }

  async findTeam(seasonId: number, ownerId: number): Promise<Team> {
    console.log(seasonId);
    console.log(ownerId);
    throw new Error('Method not implemented.');
  }

  findTeamById(teamId: number): Promise<Team> {
    console.log(teamId);
    throw new Error('Method not implemented.');
  }

  doesTeamExist(seasonId: number, ownerId: number): Promise<boolean> {
    console.log(seasonId, ownerId);
    throw new Error('Method not implemented.');
  }

  doesTeamExistById(teamId: number): Promise<boolean> {
    console.log(teamId);
    throw new Error('Method not implemented.');
  }

  createSleeperSeason(seasonId: number, sleeperLeagueId: string): Promise<number> {
    console.log(seasonId, sleeperLeagueId);
    throw new Error('Method not implemented.');
  }
  findSleeperSeasonBySleeperLeagueId(sleeperLeagueId: string): Promise<Season> {
    console.log(sleeperLeagueId);
    throw new Error('Method not implemented.');
  }

  saveSleeperLeague(sleeperLeague: SleeperLeague): Promise<void> {
    console.log(sleeperLeague);
    throw new Error('Method not implemented.');
  }
}
