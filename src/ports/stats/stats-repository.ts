import { League } from "@entities/league";
import { Owner } from "@entities/owner";
import { Season } from "@entities/season";
import { Team } from "@entities/team";

// TODO: still need to do implementations that are found in the old branch for the below
export interface StatsRepository {
  createLeague(leagueName: string): Promise<League>;
  findLeagueById(leagueId: number): Promise<League | undefined>;
  createOwner(ownerName: string): Promise<Owner>;
  findOwnerById(ownerId: string): Promise<Owner | undefined>;
  createSeason(seasonId: string, leagueId: number, year: number): Promise<Season>;
  findSeasonById(seasonId: number): Promise<Season | undefined>;
  createTeam(seasonId: number, ownerId: string, wins: number, losses: number, ties: number): Promise<Team>;
  findTeam(seasonId: number, ownerId: string): Promise<Team | undefined>;
}