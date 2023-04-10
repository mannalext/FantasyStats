import { Season } from '../../../entities/season';
import { getPorts } from '../../../ports/get-ports';

export async function findSeasonById(seasonId: number): Promise<Season | undefined> {
  const ports = await getPorts();
  return await ports.statsRepository.findSeasonById(seasonId);
}
