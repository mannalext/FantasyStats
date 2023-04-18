import { getPorts } from '../../../ports/get-ports';
import { EntityAlreadyExistsError, EntityDoesNotExistError } from '../../../services/errors';

export async function validateTeamDoesNotExist(seasonId: number, ownerId: number): Promise<void> {
  const ports = await getPorts();
  const doesTeamExist = await ports.statsRepository.doesTeamExist(seasonId, ownerId);
  if (doesTeamExist) {
    throw new EntityAlreadyExistsError(`Team already exists for season id ${seasonId} and owner id ${ownerId}`);
  }
}

export async function validateTeamExists(seasonId: number, ownerId: number): Promise<void> {
  const ports = await getPorts();
  const doesTeamExist = await ports.statsRepository.doesTeamExist(seasonId, ownerId);
  if (!doesTeamExist) {
    throw new EntityDoesNotExistError(`Team does not exist for season id ${seasonId} and owner id ${ownerId}`);
  }
}

export async function validateTeamExistsById(teamId: number): Promise<void> {
  const ports = await getPorts();
  const doesTeamExist = await ports.statsRepository.doesTeamExistById(teamId);
  if (!doesTeamExist) {
    throw new EntityDoesNotExistError(`Team does not exist for team id ${teamId}`);
  }
}
