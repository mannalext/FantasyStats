import { SleeperLeague } from '@entities/sleeper/sleeper-league';
import { getPortsForTesting } from '../../helpers/ports-for-testing';
import { SleeperClient } from '@ports/sleeper-client/sleeper-client';
import { server } from '../../helpers/mocks/server';

// all sleeper tests use MSW to intercept calls to sleeper and mock the response
describe('sleeper-client', () => {
  let client: SleeperClient;
  let ports;

  beforeAll(() => {
    server.listen();
    ports = getPortsForTesting();
    client = ports.sleeperClient;
  });
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  describe('getLeagueById', () => {
    it('should return a sleeper league', async () => {
      const sleeperLeagueId = '1234';
      const sleeperLeague: SleeperLeague = {
        leagueId: sleeperLeagueId,
        leagueName: 'Test League',
        rosterCount: 12,
        rosterPositions: ['QB', 'RB', 'WR', 'TE', 'FLEX', 'D/ST', 'K'],
        sport: 'nfl',
        seasonType: 'regular',
        seasonYear: 2020,
        previousLeagueId: 'somePreviousLeagueId',
        loserBracketId: '1234',
        draftId: 'someDraftId',
        bracketId: '1234',
      };

      expect(await client.getLeagueById(sleeperLeagueId)).toEqual(sleeperLeague);
    });
  });

  describe('getRostersForLeague', () => {
    it('should return a list of rosters', async () => {
      const sleeperLeagueId = '1234';
      const rosters = await client.getRostersForLeague(sleeperLeagueId);

      expect(rosters.length).toEqual(1);
    });
  });
});
