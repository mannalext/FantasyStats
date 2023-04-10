import { createLeague } from '@services/stats/leagues/create-league';
import { createSeason } from '@services/stats/seasons/create-season';
import { findSeasonById } from '@services/stats/seasons/find-season-by-id';

describe('createSeason service', () => {
  describe('when a unique combination of league and year is passed in', () => {
    it('creates a creates a season', async () => {
      const someLeagueName = 'someLeagueName';
      const leagueId = await createLeague(someLeagueName);
      const seasonId = await createSeason(leagueId);
      const season = await findSeasonById(seasonId);
      expect(season).toEqual({
        leagueId,
        id: seasonId,
        year: new Date().getFullYear(),
      });
    });
  });

  describe('when a non unique combination of league and year is passed in', () => {
    it('throws an exception', async () => {
      const someLeagueName = 'someLeagueName';
      const leagueId = await createLeague(someLeagueName);
      await createSeason(leagueId);
      await expect(createSeason(leagueId)).rejects.toThrow();
    });
  });

  describe('when a non existent league id is passed in', () => {
    it('throws an exception', async () => {
      await expect(createSeason(69)).rejects.toThrow();
    });
  });

  describe('when the season already exists', () => {
    it('throws an exception', async () => {
      const someLeagueName = 'someLeagueName';
      const leagueId = await createLeague(someLeagueName);
      await createSeason(leagueId);
      await expect(createSeason(leagueId)).rejects.toThrow();
    });
  });
});
