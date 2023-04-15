import { getPorts } from '../../../ports/get-ports';
import { validateLeagueExists } from '../leagues/leagues-validators';
import { validateSeasonDoesNotAlreadyExist } from './seasons-validators';

export async function createSeason(leagueId: number): Promise<number> {
  const ports = await getPorts();
  await validateLeagueExists(leagueId);
  await validateSeasonDoesNotAlreadyExist(leagueId);
  return await ports.statsRepository.createSeason(leagueId);
}
