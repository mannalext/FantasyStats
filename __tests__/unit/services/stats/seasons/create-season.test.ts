import { EntityAlreadyExistsError, EntityDoesNotExistError } from '@services/errors';
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
    it('throws an EntityAlreadyExistsError', async () => {
      const someLeagueName = 'someLeagueName';
      const leagueId = await createLeague(someLeagueName);
      await createSeason(leagueId);
      await expect(createSeason(leagueId)).rejects.toEqual(
        new EntityAlreadyExistsError('A season already exists for this league and year')
      );
    });
  });

  describe('when a non existent league id is passed in', () => {
    it('throws an exception', async () => {
      const leagueId = 69;
      await expect(createSeason(leagueId)).rejects.toEqual(
        new EntityDoesNotExistError(`No league found for id ${leagueId}`)
      );
    });
  });
});
