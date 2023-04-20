import { League } from '@entities/league';
import { Owner } from '@entities/owner';
import { Season } from '@entities/season';
import { SleeperLeague } from '@entities/sleeper/sleeper-league';
import { Team } from '@entities/team';

// TODO: add stuff to write SleeperDTOs to the DB
export interface StatsRepository {
  createLeague(leagueName: string): Promise<number>;
  findLeagueById(leagueId: number): Promise<League>;
  doesLeagueExist(leagueId: number): Promise<boolean>;
  createOwner(ownerName: string): Promise<number>;
  findOwnerById(ownerId: number): Promise<Owner>;
  doesOwnerExist(ownerId: number): Promise<boolean>;
  createSeason(leagueId: number): Promise<number>;
  doesSeasonExistBySeasonId(seasonId: number): Promise<boolean>;
  doesSeasonExistByLeagueId(leagueId: number): Promise<boolean>;
  findSeasonById(seasonId: number): Promise<Season>;
  findSeasonByLeagueAndYear(leagueId: number, year: number): Promise<Season>;
  createTeam(seasonId: number, ownerId: number): Promise<number>;
  findTeam(seasonId: number, ownerId: number): Promise<Team>;
  findTeamById(teamId: number): Promise<Team>;
  doesTeamExist(seasonId: number, ownerId: number): Promise<boolean>;
  doesTeamExistById(teamId: number): Promise<boolean>;

  saveSleeperLeague(sleeperLeague: SleeperLeague): Promise<void>;
}
