import { getPorts } from '../../../ports/get-ports';
import { Owner } from '../../../entities/owner';
import { validateOwnerExists } from './owners-validators';

export async function findOwnerById(ownerId: number): Promise<Owner> {
  const ports = await getPorts();
  await validateOwnerExists(ownerId);
  return await ports.statsRepository.findOwnerById(ownerId);
}
