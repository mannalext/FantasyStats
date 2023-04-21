import { SleeperLeague } from '../../entities/sleeper/sleeper-league';
import { getPorts } from '../../ports/get-ports';

export class SleeperClientService {
  public async getLeagueById(sleeperLeagueId: string): Promise<SleeperLeague> {
    const ports = await getPorts();
    // TODO: consider validators. do they live here or in the http client?
    return await ports.sleeperClient.getLeagueById(sleeperLeagueId);
  }
}
