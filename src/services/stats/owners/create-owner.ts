import { getPorts } from '../../../ports/get-ports';

export async function createOwner(ownerName: string): Promise<number> {
  const ports = await getPorts();
  return await ports.statsRepository.createOwner(ownerName);
}
