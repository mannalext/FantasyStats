import { SleeperLeague } from '../../entities/sleeper/sleeper-league';
import { SleeperRoster } from '../../entities/sleeper/sleeper-roster';

import { getPorts } from '../../ports/get-ports';

export class SleeperClientService {
  public async getLeagueById(sleeperLeagueId: string): Promise<SleeperLeague> {
    const ports = await getPorts();
    // TODO: consider validators. do they live here or in the http client?
    return await ports.sleeperClient.getLeagueById(sleeperLeagueId);
  }

  public async getRostersForLeague(sleeperLeagueId: string): Promise<SleeperRoster[]> {
    const ports = await getPorts();
    return await ports.sleeperClient.getRostersForLeague(sleeperLeagueId);
  }
}
