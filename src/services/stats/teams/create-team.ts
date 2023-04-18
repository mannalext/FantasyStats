import { getPorts } from '../../../ports/get-ports';
import { validateOwnerExists } from '../owners/owners-validators';
import { validateSeasonExistsBySeasonId } from '../seasons/seasons-validators';
import { validateTeamDoesNotExist } from './teams-validators';

export async function createTeam(seasonId: number, ownerId: number): Promise<number> {
  const ports = await getPorts();
  await validateSeasonExistsBySeasonId(seasonId);
  await validateOwnerExists(ownerId);
  await validateTeamDoesNotExist(seasonId, ownerId);
  return await ports.statsRepository.createTeam(seasonId, ownerId);
}
