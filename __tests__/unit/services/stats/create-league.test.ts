import { createLeague } from '../../../../src/services/stats/create-league';
import { findLeagueById } from '../../../../src/services/stats/find-league-by-id';

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
