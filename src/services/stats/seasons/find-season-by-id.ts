import { Season } from '../../../entities/season';
import { getPorts } from '../../../ports/get-ports';
import { validateSeasonExistsBySeasonId } from './seasons-validators';

export async function findSeasonById(seasonId: number): Promise<Season> {
  const ports = await getPorts();
  await validateSeasonExistsBySeasonId(seasonId);
  return await ports.statsRepository.findSeasonById(seasonId);
}
