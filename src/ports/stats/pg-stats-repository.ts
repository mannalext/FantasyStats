import { League } from "@src/entities/league";
import { Owner } from "@src/entities/owner";
import { Season } from "@src/entities/season";
import { Team } from "@src/entities/team";
import { query } from ".";
import { StatsRepository } from "./stats-repository";

export class PgStatsRepository implements StatsRepository {

  // TODO need to run this to see what a queryResult looks like
  // ideally debug. that means the following:
  /**
   * 1. get the app running
   *  - docker, db, etc
   * 2. get a debugger attached, somehow. while in docker
   */
  async createLeague(leagueName: string): Promise<League> {
    const queryResult = await query('INSERT INTO leagues (name) VALUES ($1)', [ leagueName ]);
    console.log(queryResult.rows[0]);

    // TODO: translate this into the actual type before returning
    return queryResult.rows[0];
  }
  findLeagueById(leagueId: number): Promise<League | undefined> {
    throw new Error("Method not implemented.");
  }
  createOwner(ownerName: string): Promise<Owner> {
    throw new Error("Method not implemented.");
  }
  findOwnerById(ownerId: string): Promise<Owner | undefined> {
    throw new Error("Method not implemented.");
  }
  createSeason(seasonId: string, leagueId: number, year: number): Promise<Season> {
    throw new Error("Method not implemented.");
  }
  findSeasonById(seasonId: number): Promise<Season | undefined> {
    throw new Error("Method not implemented.");
  }
  createTeam(seasonId: number, ownerId: string, wins: number, losses: number, ties: number): Promise<Team> {
    throw new Error("Method not implemented.");
  }
  findTeam(seasonId: number, ownerId: string): Promise<Team | undefined> {
    throw new Error("Method not implemented.");
  }
  
}