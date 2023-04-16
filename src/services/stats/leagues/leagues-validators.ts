import { EntityDoesNotExistError } from '../../../services/errors';
import { getPorts } from '../../../ports/get-ports';

export async function validateLeagueExists(leagueId: number): Promise<void> {
  const ports = await getPorts();
  const doesLeagueExist = await ports.statsRepository.doesLeagueExist(leagueId);
  if (!doesLeagueExist) {
    throw new EntityDoesNotExistError(`No league found for that ID`);
  }
}
