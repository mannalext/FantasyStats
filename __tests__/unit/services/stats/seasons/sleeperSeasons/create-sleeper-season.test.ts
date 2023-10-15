import { EntityAlreadyExistsError, EntityDoesNotExistError } from '@services/errors';
import { createLeague } from '@services/stats/leagues/create-league';
import { createSeason } from '@services/stats/seasons/create-season';

import { createSleeperSeason } from '@services/stats/seasons/sleeperSeasons/create-sleeper-season';
import { SleeperSeason } from '@entities/season';
import { findSleeperSeasonBySleeperLeagueId } from '@services/stats/seasons/sleeperSeasons/find-sleeper-season-by-sleeper-league-id';

describe('createSleeperSeason service', () => {
  const mockedSleeperLeagueId = '1234';

  describe('when a unique combination of seasonId and sleeperLeagueId is given', () => {
    it('creates a sleeperSeason', async () => {
      const someLeagueName = 'someLeagueNameUnique';
      const leagueId = await createLeague(someLeagueName);
      const seasonId = await createSeason(leagueId);
      const sleeperSeasonId = await createSleeperSeason(seasonId, mockedSleeperLeagueId);
      const sleeperSeason: SleeperSeason = await findSleeperSeasonBySleeperLeagueId(mockedSleeperLeagueId);
      expect(sleeperSeason).toEqual({
        sleeperLeagueId: mockedSleeperLeagueId,
        id: sleeperSeasonId,
        seasonId,
        year: new Date().getFullYear(),
      });
    });
  });

  describe('when a non unique combination of seasonId and sleeperLeagueId is passed in', () => {
    it('throws an EntityAlreadyExistsError', async () => {
      const someLeagueName = 'someLeagueName';
      const leagueId = await createLeague(someLeagueName);
      const seasonId = await createSeason(leagueId);
      await createSleeperSeason(seasonId, mockedSleeperLeagueId);
      await expect(createSleeperSeason(seasonId, mockedSleeperLeagueId)).rejects.toEqual(
        new EntityAlreadyExistsError(`A sleeper season already exists for SleeperLeagueId ${mockedSleeperLeagueId}`)
      );
    });
  });

  describe('when a non existent season id is passed in', () => {
    it('throws an exception', async () => {
      await expect(createSleeperSeason(9_999_999, mockedSleeperLeagueId)).rejects.toEqual(
        new EntityDoesNotExistError(`No league found for that ID`)
      );
    });
  });
});
