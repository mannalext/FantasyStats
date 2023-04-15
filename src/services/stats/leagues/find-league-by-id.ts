import { League } from '../../../entities/league';
import { getPorts } from '../../../ports/get-ports';
import { validateLeagueExists } from './leagues-validators';

export async function findLeagueById(leagueId: number): Promise<League> {
  const ports = await getPorts();
  await validateLeagueExists(leagueId);
  return await ports.statsRepository.findLeagueById(leagueId);
}
