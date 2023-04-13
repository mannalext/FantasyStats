import { getPorts } from '../../../ports/get-ports';
import { Owner } from '../../../entities/owner';

export async function findOwnerById(ownerId: number): Promise<Owner | undefined> {
  const ports = await getPorts();
  return await ports.statsRepository.findOwnerById(ownerId);
}
