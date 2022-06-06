import { League } from "../../entities/league";
import { Owner } from "../../entities/owner";
import { Season } from "../../entities/season";
import { Team } from "../../entities/team";
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
    console.log(`queryResult.rows[0], ${queryResult.rows[0]}`);

    // TODO: translate this into the actual type before returning
    return queryResult.rows[0];
  }
  findLeagueById(leagueId: number): Promise<League | undefined> {
    console.log(leagueId);
    console.log('YOU ABOUT TO BLOW UP');
    throw new Error("Method not implemented.");
  }
  createOwner(ownerName: string): Promise<Owner> {
    console.log(ownerName);
    // TODO: generate a UUID and send it in
    throw new Error("Method not implemented.");
  }
  findOwnerById(ownerId: string): Promise<Owner | undefined> {
    console.log(ownerId);
    throw new Error("Method not implemented.");
  }
  createSeason(seasonId: string, leagueId: number, year: number): Promise<Season> {
    console.log(seasonId, leagueId, year);
    throw new Error("Method not implemented.");
  }
  findSeasonById(seasonId: number): Promise<Season | undefined> {
    console.log(seasonId);
    throw new Error("Method not implemented.");
  }
  createTeam(seasonId: number, ownerId: string, wins: number, losses: number, ties: number): Promise<Team> {
    console.log(seasonId, ownerId, wins, losses, ties);
    throw new Error("Method not implemented.");
  }
  findTeam(seasonId: number, ownerId: string): Promise<Team | undefined> {
    console.log(seasonId, ownerId);
    throw new Error("Method not implemented.");
  }
  
}