import { SleeperSeason } from '@entities/season';
import { getPorts } from '@ports/get-ports';
import { validateSleeperSeasonExistsBySleeperLeagueId } from '../seasons-validators';

export async function findSleeperSeasonBySleeperLeagueId(sleeperLeagueId: string): Promise<SleeperSeason> {
  const ports = await getPorts();
  await validateSleeperSeasonExistsBySleeperLeagueId(sleeperLeagueId);
  return await ports.statsRepository.findSleeperSeasonBySleeperLeagueId(sleeperLeagueId);
}
