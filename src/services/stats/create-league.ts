import { League } from "@entities/league";
import { PgStatsRepository } from "../../ports/stats/pg-stats-repository";

export async function createLeague(leagueName: string): Promise<League> {
  // TODO: ports
  const repo = new PgStatsRepository();
  // TODO prevent duplicates? maybe that's not necessary? probably should be allowed. but how to do we tell them apart?
  return repo.createLeague(leagueName);
}