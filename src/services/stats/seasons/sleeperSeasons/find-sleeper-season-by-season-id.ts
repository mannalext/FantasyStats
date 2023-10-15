import { SleeperSeason } from '../../../../entities/season';
import { getPorts } from '../../../../ports/get-ports';
import { validateSleeperSeasonExistsBySeasonId } from '../seasons-validators';

export async function findSleeperSeasonBySeasonId(seasonId: number): Promise<SleeperSeason> {
  const ports = await getPorts();
  await validateSleeperSeasonExistsBySeasonId(seasonId);
  return await ports.statsRepository.findSleeperSeasonBySeasonId(seasonId);
}
