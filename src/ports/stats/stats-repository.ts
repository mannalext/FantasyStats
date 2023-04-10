import { League } from '@entities/league';
import { Owner } from '@entities/owner';
import { Season } from '@entities/season';
import { Team } from '@entities/team';

export interface StatsRepository {
  createLeague(leagueName: string): Promise<number>;
  findLeagueById(leagueId: number): Promise<League | undefined>;
  createOwner(ownerName: string): Promise<Owner>; // TODO: createOwner and createTeam should return number
  findOwnerById(ownerId: string): Promise<Owner | undefined>;
  createSeason(leagueId: number): Promise<number>;
  findSeasonById(seasonId: number): Promise<Season | undefined>; // this may not wind up being useful
  findSeasonByLeagueAndYear(leagueId: number, year: number): Promise<Season | undefined>;
  createTeam(seasonId: number, ownerId: string, wins: number, losses: number, ties: number): Promise<Team>;
  findTeam(seasonId: number, ownerId: string): Promise<Team | undefined>;
}
