import { League } from '../../entities/league';
import { Owner } from '../../entities/owner';
import { Season } from '../../entities/season';
import { Team } from '../../entities/team';
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

  async findLeagueById(leagueId: number): Promise<League | undefined> {
    return this.leagues.find(league => {
      return league.id === leagueId;
    });
  }
  async createOwner(ownerName: string): Promise<Owner> {
    console.log(ownerName);
    throw new Error('Method not implemented.');
  }

  async findOwnerById(ownerId: string): Promise<Owner | undefined> {
    console.log(ownerId);
    throw new Error('Method not implemented.');
  }

  async createSeason(seasonId: string, leagueId: number, year: number): Promise<Season> {
    console.log(seasonId);
    console.log(leagueId);
    console.log(year);
    throw new Error('Method not implemented.');
  }

  async findSeasonById(seasonId: number): Promise<Season | undefined> {
    console.log(seasonId);
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
