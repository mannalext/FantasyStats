import { Season } from '../../../entities/season';
import { getPorts } from '../../../ports/get-ports';

export async function findSeasonByLeagueAndYear(leagueId: number, year: number): Promise<Season | undefined> {
  const ports = await getPorts();
  return await ports.statsRepository.findSeasonByLeagueAndYear(leagueId, year);
}
