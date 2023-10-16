import { SleeperRoster } from '../../entities/sleeper/sleeper-roster';
import { SleeperLeague } from '../../entities/sleeper/sleeper-league';

export interface SleeperClient {
  getLeagueById(sleeperLeagueId: string): Promise<SleeperLeague>;
  getRostersForLeague(sleeperLeagueId: string): Promise<SleeperRoster[]>;

  doesSleeperLeagueExistBySleeperLeagueId(sleeperLeagueId: string): Promise<boolean>;
}
