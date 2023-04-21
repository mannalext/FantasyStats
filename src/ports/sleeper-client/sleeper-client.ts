import { SleeperLeague } from '../../entities/sleeper/sleeper-league';

export interface SleeperClient {
  getLeagueById(sleeperLeagueId: string): Promise<SleeperLeague>;
}
