import { League } from '@entities/league';
import { Owner } from '@entities/owner';
import { Season } from '@entities/season';
import { Team } from '@entities/team';
import { StatsRepository } from './stats-repository';

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

  async findOwnerById(ownerId: number): Promise<Owner | undefined> {
    console.log(ownerId);
    throw new Error('Method not implemented.');
  }

  async createSeason(leagueId: number): Promise<number> {
    console.log(leagueId);
    throw new Error('Method not implemented.');
  }

  async findSeasonById(seasonId: number): Promise<Season | undefined> {
    console.log(seasonId);
    throw new Error('Method not implemented.');
  }

  async findSeasonByLeagueAndYear(leagueId: number, year: number): Promise<Season | undefined> {
    console.log(leagueId, year);
    throw new Error('Method not implemented.');
  }

  async createTeam(seasonId: number, ownerId: string, wins: number, losses: number, ties: number): Promise<Team> {
    console.log(seasonId);
    console.log(ownerId);
    console.log(wins);
    console.log(losses);
    console.log(ties);
    throw new Error('Method not implemented.');
  }

  async findTeam(seasonId: number, ownerId: string): Promise<Team | undefined> {
    console.log(seasonId);
    console.log(ownerId);
    throw new Error('Method not implemented.');
  }
}
