import { Team } from '@entities/team';
import { getPorts } from '../../../ports/get-ports';
import { validateTeamExistsById } from './teams-validators';

export async function findTeamById(teamId: number): Promise<Team> {
  const ports = await getPorts();
  await validateTeamExistsById(teamId);
  return await ports.statsRepository.findTeamById(teamId);
}
