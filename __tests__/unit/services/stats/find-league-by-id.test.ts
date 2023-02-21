import { createLeague } from '../../../../src/services/stats/create-league';
import { findLeagueById } from '../../../../src/services/stats/find-league-by-id';

describe('findLeagueById service', () => {
  describe('when a league exists with the given leagueId', () => {
    it('returns it', async () => {
      const leagueName = 'someLeagueName';
      const leagueId = await createLeague(leagueName);
      const someLeague = {
        name: leagueName,
        id: leagueId,
      };

      const league = await findLeagueById(leagueId);

      expect(league).toEqual(someLeague);
    });
  });

  describe('when a league does not exist with the given leagueId', () => {
    it('returns undefined', async () => {
      const league = await findLeagueById(99_999_999);
      expect(league).toEqual(undefined);
    });
  });
});
