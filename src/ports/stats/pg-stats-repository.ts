import { League } from "../../entities/league";
import { Owner } from "../../entities/owner";
import { Season } from "../../entities/season";
import { Team } from "../../entities/team";
import { query } from ".";
import { StatsRepository } from "./stats-repository";

export class PgStatsRepository implements StatsRepository {

  async createLeague(leagueName: string): Promise<void> {
    // TODO: figure out how to return something identifying from these requests
    await query('INSERT INTO leagues (name) VALUES ($1)', [ leagueName ]);
  }
  async findLeagueById(leagueId: number): Promise<League | undefined> {
    console.log(leagueId);
    const found = await query('SELECT * FROM leagues WHERE league_id=$1', [ leagueId ]);
    // TODO: enhance query? max 1? idk
    return found.rows[0] as unknown as League; // TODO: write a type guard so you don't have to do this
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