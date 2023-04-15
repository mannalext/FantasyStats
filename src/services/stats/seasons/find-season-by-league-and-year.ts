import { Season } from '../../../entities/season';
import { getPorts } from '../../../ports/get-ports';
import { validateLeagueExists } from '../leagues/leagues-validators';
import { validateSeasonExistsByLeagueId } from './seasons-validators';

export async function findSeasonByLeagueAndYear(leagueId: number, year: number): Promise<Season> {
  const ports = await getPorts();
  await validateLeagueExists(leagueId);
  await validateSeasonExistsByLeagueId(leagueId);
  return await ports.statsRepository.findSeasonByLeagueAndYear(leagueId, year);
}
