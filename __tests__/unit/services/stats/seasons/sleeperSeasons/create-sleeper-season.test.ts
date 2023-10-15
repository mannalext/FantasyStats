import { EntityAlreadyExistsError, EntityDoesNotExistError } from '@services/errors';
import { createLeague } from '@services/stats/leagues/create-league';
import { createSeason } from '@services/stats/seasons/create-season';
import { createSleeperSeason } from '@services/stats/seasons/sleeperSeasons/create-sleeper-season';
import { SleeperSeason } from '@entities/season';
import { findSleeperSeasonBySleeperLeagueId } from '@services/stats/seasons/sleeperSeasons/find-sleeper-season-by-sleeper-league-id';
import { server } from '../../../../../helpers/mocks/server';
import { getPortsForTesting } from '../../../../../helpers/ports-for-testing';
import { StatsRepository } from '@ports/stats/stats-repository';

describe('createSleeperSeason service', () => {
  const mockedSleeperLeagueId = '1234';
  let ports;
  let repo: StatsRepository;

  beforeAll(() => {
    server.listen();
    ports = getPortsForTesting();
    repo = ports.statsRepository;
  });
  afterEach(() => {
    server.resetHandlers();
  });
  afterAll(() => server.close());

  describe('when a unique combination of seasonId and sleeperLeagueId is given', () => {
    it('creates a sleeperSeason', async () => {
      const someLeagueName = 'someLeagueNameUnique';
      const leagueId = await createLeague(someLeagueName);
      const seasonId = await createSeason(leagueId);
      await createSleeperSeason(seasonId, mockedSleeperLeagueId);
      const sleeperSeason: SleeperSeason = await findSleeperSeasonBySleeperLeagueId(mockedSleeperLeagueId);
      expect(sleeperSeason).toEqual({
        sleeperLeagueId: mockedSleeperLeagueId,
        id: seasonId,
        leagueId: leagueId,
        year: new Date().getFullYear(),
      });
      await repo.deleteSleeperSeason(mockedSleeperLeagueId);
    });
  });

  describe('when a non unique combination of seasonId and sleeperLeagueId is passed in', () => {
    it('throws an EntityAlreadyExistsError', async () => {
      const someLeagueName = 'someLeagueName';
      const leagueId = await createLeague(someLeagueName);
      const seasonId = await createSeason(leagueId);
      await createSleeperSeason(seasonId, mockedSleeperLeagueId);

      await expect(createSleeperSeason(seasonId, mockedSleeperLeagueId)).rejects.toEqual(
        new EntityAlreadyExistsError(`A sleeper season already exists for that SleeperLeagueId`)
      );

      await repo.deleteSleeperSeason(mockedSleeperLeagueId);
    });
  });

  describe('when a non existent season id is passed in', () => {
    it('throws an exception', async () => {
      await expect(createSleeperSeason(9_999_999, mockedSleeperLeagueId)).rejects.toEqual(
        new EntityDoesNotExistError(`No season found for season id 9999999`)
      );
    });
  });

  describe('when a non existent sleeperLeagueId is passed in', () => {
    it('throws an exception', async () => {
      const someLeagueName = 'someLeagueName';
      const leagueId = await createLeague(someLeagueName);
      const seasonId = await createSeason(leagueId);

      await expect(createSleeperSeason(seasonId, 'DoesNotExist')).rejects.toEqual(
        new EntityDoesNotExistError(`No league found on Sleeper found for SleeperLeagueId DoesNotExist`)
      );
    });
  });
});
