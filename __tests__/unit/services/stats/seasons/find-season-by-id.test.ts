import { EntityDoesNotExistError } from '@services/errors';
import { createLeague } from '@services/stats/leagues/create-league';
import { createSeason } from '@services/stats/seasons/create-season';
import { findSeasonById } from '@services/stats/seasons/find-season-by-id';

describe('findSeasonById service', () => {
  describe('when a season exists with the given seasonId', () => {
    it('returns it', async () => {
      const leagueName = 'someLeagueName';
      const leagueId = await createLeague(leagueName);
      const seasonId = await createSeason(leagueId);

      const someSeason = {
        id: seasonId,
        leagueId,
        year: new Date().getFullYear(),
      };

      const season = await findSeasonById(seasonId);

      expect(season).toEqual(someSeason);
    });
  });

  describe('when a season does not exist with the given seasonId', () => {
    it('returns throws an EntityDoesNotExistError', async () => {
      await expect(findSeasonById(9_999_999)).rejects.toEqual(
        new EntityDoesNotExistError('No season found for season id 9999999')
      );
    });
  });
});
