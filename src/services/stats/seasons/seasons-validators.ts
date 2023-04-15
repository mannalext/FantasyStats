import { getPorts } from '../../../ports/get-ports';
import { EntityAlreadyExistsError, EntityDoesNotExistError } from '../../../services/errors';

export async function validateSeasonDoesNotAlreadyExist(leagueId: number): Promise<void> {
  const ports = await getPorts();
  const doesSeasonExist = await ports.statsRepository.doesSeasonExist(leagueId);
  if (doesSeasonExist) {
    throw new EntityAlreadyExistsError('A season already exists for this league and year');
  }
}

export async function validateSeasonExists(seasonId: number): Promise<void> {
  const ports = await getPorts();
  const doesSeasonExist = await ports.statsRepository.doesSeasonExist(seasonId);
  if (!doesSeasonExist) {
    throw new EntityDoesNotExistError(`No season found for id ${seasonId}`);
  }
}
