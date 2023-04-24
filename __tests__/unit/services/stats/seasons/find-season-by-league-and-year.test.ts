import { Season } from '@entities/season';
import { EntityDoesNotExistError } from '@services/errors';
import { createLeague } from '@services/stats/leagues/create-league';
import { createSeason } from '@services/stats/seasons/create-season';
import { findSeasonByLeagueAndYear } from '@services/stats/seasons/find-season-by-league-and-year';

describe('findSeasonByLeagueAndYear service', () => {
  describe('when a season exists within the given league and year', () => {
    it('returns it', async () => {
      const leagueName = 'someLeagueName';
      const leagueId = await createLeague(leagueName);
      const seasonId = await createSeason(leagueId);

      const someSeason: Season = {
        id: seasonId,
        leagueId,
        sleeperLeagueId: '',
        year: new Date().getFullYear(),
      };

      const season = await findSeasonByLeagueAndYear(leagueId, someSeason.year);

      expect(season).toEqual(someSeason);
    });
  });

  describe('when a season does not exist within the given league and year', () => {
    it('throws an EntityDoesNotExistError', async () => {
      const leagueName = 'someLeagueName';
      const leagueId = await createLeague(leagueName);
      await expect(findSeasonByLeagueAndYear(leagueId, new Date().getFullYear())).rejects.toEqual(
        new EntityDoesNotExistError(`No season found for league id ${leagueId}`)
      );
    });
  });
});
