import { getPorts } from '../../../ports/get-ports';
import { EntityDoesNotExistError } from '../../../services/errors';

export async function validateOwnerExists(ownerId: number): Promise<void> {
  const ports = await getPorts();
  const doesOwnerExist = await ports.statsRepository.doesOwnerExist(ownerId);
  if (!doesOwnerExist) {
    throw new EntityDoesNotExistError(`No owner found for id ${ownerId}`);
  }
}
