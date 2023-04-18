import { SleeperLeagueDTO } from '../../entities/sleeper/sleeper-league';

export interface SleeperClient {
  getLeagueById(leagueId: number): Promise<SleeperLeagueDTO>;
}
