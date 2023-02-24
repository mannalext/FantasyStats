import { getPorts } from '../../../ports/get-ports';

export async function createLeague(leagueName: string): Promise<number> {
  const ports = await getPorts();
  return await ports.statsRepository.createLeague(leagueName);
}
