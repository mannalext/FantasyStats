import { createLeague } from '@services/stats/leagues/create-league';
import { findLeagueById } from '@services/stats/leagues/find-league-by-id';

describe('createLeague service', () => {
  describe('when a potential league name is passed in', () => {
    it('creates a league', async () => {
      const someLeagueName = 'someLeagueName';
      const leagueId = await createLeague(someLeagueName);

      const league = await findLeagueById(leagueId);

      expect(league).toEqual({
        name: someLeagueName,
        id: leagueId,
      });
    });
  });
});
