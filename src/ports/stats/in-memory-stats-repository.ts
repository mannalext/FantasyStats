import { League } from '../../entities/league';
import { Owner } from '../../entities/owner';
import { Season } from '../../entities/season';
import { Team } from '../../entities/team';
import { StatsRepository } from './stats-repository';

export class InMemoryStatsRepository implements StatsRepository {
  createLeague(leagueName: string): Promise<number> {
    console.log(leagueName);
    throw new Error('Method not implemented.');
  }
  findLeagueById(leagueId: number): Promise<League | undefined> {
    console.log(leagueId);
    throw new Error('Method not implemented.');
  }
  createOwner(ownerName: string): Promise<Owner> {
    console.log(ownerName);
    throw new Error('Method not implemented.');
  }
  findOwnerById(ownerId: string): Promise<Owner | undefined> {
    console.log(ownerId);
    throw new Error('Method not implemented.');
  }
  createSeason(seasonId: string, leagueId: number, year: number): Promise<Season> {
    console.log(seasonId);
    console.log(leagueId);
    console.log(year);
    throw new Error('Method not implemented.');
  }
  findSeasonById(seasonId: number): Promise<Season | undefined> {
    console.log(seasonId);
    throw new Error('Method not implemented.');
  }
  createTeam(seasonId: number, ownerId: string, wins: number, losses: number, ties: number): Promise<Team> {
    console.log(seasonId);
    console.log(ownerId);
    console.log(wins);
    console.log(losses);
    console.log(ties);
    throw new Error('Method not implemented.');
  }
  findTeam(seasonId: number, ownerId: string): Promise<Team | undefined> {
    console.log(seasonId);
    console.log(ownerId);
    throw new Error('Method not implemented.');
  }
}
