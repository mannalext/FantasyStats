import { getPorts } from '../../../ports/get-ports';

export async function createSeason(leagueId: number): Promise<number> {
  const ports = await getPorts();
  return await ports.statsRepository.createSeason(leagueId);
}
