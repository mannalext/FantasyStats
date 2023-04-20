import { SleeperLeague } from '@entities/sleeper/sleeper-league';
import { getPortsForTesting } from '../../helpers/ports-for-testing';
import { sleeperLeagueDTOFixture } from './sleeper-client-fixtures';
import axios, { AxiosResponse } from 'axios';
import { SleeperClient } from '@ports/sleeper-client/sleeper-client';

describe('sleeper-client', () => {
  let client: SleeperClient;
  let ports;

  beforeAll(() => {
    ports = getPortsForTesting();
    client = ports.sleeperClient;
  });

  describe('getLeagueById', () => {
    it('should return a sleeper league', async () => {
      const sleeperLeagueId = '1234';
      const mockGetLeagueResponse: AxiosResponse = {
        data: sleeperLeagueDTOFixture,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
      };

      const sleeperLeague: SleeperLeague = {
        leagueId: sleeperLeagueId,
        leagueName: 'Test League',
        rosterCount: 12,
        rosterPositions: ['QB', 'RB', 'WR', 'TE', 'FLEX', 'D/ST', 'K'],
        sport: 'nfl',
        seasonType: 'regular',
        seasonYear: 2020,
        previousLeagueId: '123',
        loserBracketId: '456',
        draftId: '789',
        bracketId: '1011',
      };

      expect(await client.getLeagueById(sleeperLeagueId)).toEqual(sleeperLeague);
    });
  });
});
