import { PgStatsRepository } from "../../ports/stats/pg-stats-repository";

export async function createLeague(leagueName: string): Promise<void> {
  // TODO: ports
  const repo = new PgStatsRepository();
  // TODO prevent duplicates? maybe that's not necessary? probably should be allowed. but how to do we tell them apart?
  await repo.createLeague(leagueName);
}