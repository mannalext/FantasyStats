import { EntityDoesNotExistError } from '@services/errors';
import { createLeague } from '@services/stats/leagues/create-league';
import { findLeagueById } from '@services/stats/leagues/find-league-by-id';

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
    it('throws a LeagueDoesNotExistError', async () => {
      const leagueId = 9_999_999;
      await expect(findLeagueById(leagueId)).rejects.toEqual(
        new EntityDoesNotExistError(`No league found for id ${leagueId}`)
      );
    });
  });
});
