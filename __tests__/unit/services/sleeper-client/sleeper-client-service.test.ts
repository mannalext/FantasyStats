import { SleeperLeague } from '@entities/sleeper/sleeper-league';
import { SleeperClientService } from '@services/sleeper-client/sleeper-client-service';
import { server } from '../../../helpers/mocks/server';

describe('sleeper-client-service', () => {
  let sleeperClientService: SleeperClientService;

  beforeAll(() => {
    sleeperClientService = new SleeperClientService();
    server.listen();
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

      expect(await sleeperClientService.getLeagueById(sleeperLeagueId)).toEqual(sleeperLeague);
    });
  });
});
