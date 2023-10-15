import { validateLeagueExists } from '../../../../services/stats/leagues/leagues-validators';
import { getPorts } from '../../../../ports/get-ports';
import { createSeason } from '../create-season';
import { validateSleeperLeagueExists, validateSleeperSeasonDoesNotAlreadyExist } from '../seasons-validators';

export async function createSleeperSeason(leagueId: number, sleeperLeagueId: string): Promise<number> {
  const ports = await getPorts();
  await validateLeagueExists(leagueId);
  await validateSleeperLeagueExists(sleeperLeagueId);
  await validateSleeperSeasonDoesNotAlreadyExist(sleeperLeagueId);
  const seasonId = await createSeason(leagueId);
  return await ports.statsRepository.createSleeperSeason(seasonId, sleeperLeagueId);
}
