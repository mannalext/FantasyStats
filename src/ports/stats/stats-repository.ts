import { League } from '@entities/league';
import { Owner } from '@entities/owner';
import { Season } from '@entities/season';
import { Team } from '@entities/team';

export interface StatsRepository {
  createLeague(leagueName: string): Promise<number>;
  findLeagueById(leagueId: number): Promise<League | undefined>;
  createOwner(ownerName: string): Promise<number>;
  findOwnerById(ownerId: number): Promise<Owner | undefined>;
  createSeason(leagueId: number): Promise<number>;
  findSeasonById(seasonId: number): Promise<Season | undefined>; // this may not wind up being useful
  findSeasonByLeagueAndYear(leagueId: number, year: number): Promise<Season | undefined>;
  createTeam(seasonId: number, ownerId: string, wins: number, losses: number, ties: number): Promise<Team>; // TODO: this should return number
  findTeam(seasonId: number, ownerId: string): Promise<Team | undefined>;
}
