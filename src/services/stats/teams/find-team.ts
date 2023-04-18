import { Team } from '../../../entities/team';
import { getPorts } from '../../../ports/get-ports';
import { validateOwnerExists } from '../owners/owners-validators';
import { validateSeasonExistsBySeasonId } from '../seasons/seasons-validators';
import { validateTeamExists } from './teams-validators';

export async function findTeam(seasonId: number, ownerId: number): Promise<Team> {
  const ports = await getPorts();
  await validateSeasonExistsBySeasonId(seasonId);
  await validateOwnerExists(ownerId);
  await validateTeamExists(seasonId, ownerId);
  return await ports.statsRepository.findTeam(seasonId, ownerId);
}
