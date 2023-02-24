import { League } from '@entities/league';
import { getPorts } from '@ports/get-ports';

export async function findLeagueById(leagueId: number): Promise<League | undefined> {
  const ports = await getPorts();
  return await ports.statsRepository.findLeagueById(leagueId);
}
