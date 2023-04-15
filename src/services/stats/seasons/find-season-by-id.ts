import { Season } from '../../../entities/season';
import { getPorts } from '../../../ports/get-ports';
import { validateSeasonExists } from './seasons-validators';

export async function findSeasonById(seasonId: number): Promise<Season> {
  const ports = await getPorts();
  await validateSeasonExists(seasonId);
  return await ports.statsRepository.findSeasonById(seasonId);
}
