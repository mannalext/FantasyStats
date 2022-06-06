import { League } from "../../entities/league";
import { PgStatsRepository } from "../../ports/stats/pg-stats-repository";

export async function findLeagueById(leagueId: number): Promise<League | undefined> {
    // TODO: ports
  const repo = new PgStatsRepository();
  return repo.findLeagueById(leagueId);
}