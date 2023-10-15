import { getPorts } from '../../../../ports/get-ports';
import {
  validateSleeperLeagueExists,
  validateSeasonExistsBySeasonId,
  validateSleeperSeasonDoesNotAlreadyExist,
} from '../seasons-validators';

export async function createSleeperSeason(seasonId: number, sleeperLeagueId: string): Promise<number> {
  const ports = await getPorts();
  await validateSeasonExistsBySeasonId(seasonId);
  await validateSleeperLeagueExists(sleeperLeagueId);
  await validateSleeperSeasonDoesNotAlreadyExist(sleeperLeagueId);
  return await ports.statsRepository.createSleeperSeason(seasonId, sleeperLeagueId);
}
