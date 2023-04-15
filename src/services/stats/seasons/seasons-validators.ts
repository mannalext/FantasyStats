import { getPorts } from '../../../ports/get-ports';
import { EntityAlreadyExistsError } from '../../../services/errors';

export async function validateSeasonDoesNotAlreadyExist(leagueId: number): Promise<void> {
  const ports = await getPorts();
  const doesSeasonExist = await ports.statsRepository.doesSeasonExist(leagueId);
  if (doesSeasonExist) {
    throw new EntityAlreadyExistsError('A season already exists for this league and year');
  }
}
