import { EntityAlreadyExistsError, EntityDoesNotExistError } from '@services/errors';
import { createLeague } from '@services/stats/leagues/create-league';
import { createSleeperSeason } from '@services/stats/seasons/sleeperSeasons/create-sleeper-season';
import { SleeperSeason } from '@entities/season';
import { findSleeperSeasonBySleeperLeagueId } from '@services/stats/seasons/sleeperSeasons/find-sleeper-season-by-sleeper-league-id';
import { server } from '../../../../../helpers/mocks/server';
import { getPortsForTesting } from '../../../../../helpers/ports-for-testing';
import { StatsRepository } from '@ports/stats/stats-repository';
import { findSeasonByLeagueAndYear } from '@services/stats/seasons/find-season-by-league-and-year';

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

  describe('when a unique combination of leagueId and sleeperLeagueId is given', () => {
    it('creates a sleeperSeason', async () => {
      const someLeagueName = 'someLeagueNameUnique';
      const leagueId = await createLeague(someLeagueName);
      await createSleeperSeason(leagueId, mockedSleeperLeagueId);
      const season = await findSeasonByLeagueAndYear(leagueId, new Date().getFullYear());
      const sleeperSeason: SleeperSeason = await findSleeperSeasonBySleeperLeagueId(mockedSleeperLeagueId);
      expect(sleeperSeason).toEqual({
        sleeperLeagueId: mockedSleeperLeagueId,
        id: season.id,
        leagueId: leagueId,
        year: new Date().getFullYear(),
      });
      await repo.deleteSleeperSeason(mockedSleeperLeagueId);
    });
  });

  describe('when a non unique combination of leagueId and sleeperLeagueId is passed in', () => {
    it('throws an EntityAlreadyExistsError', async () => {
      const someLeagueName = 'someLeagueName';
      const leagueId = await createLeague(someLeagueName);
      await createSleeperSeason(leagueId, mockedSleeperLeagueId);

      await expect(createSleeperSeason(leagueId, mockedSleeperLeagueId)).rejects.toEqual(
        new EntityAlreadyExistsError(`A sleeper season already exists for that SleeperLeagueId`)
      );

      await repo.deleteSleeperSeason(mockedSleeperLeagueId);
    });
  });

  describe('when a non existent league id is passed in', () => {
    it('throws an exception', async () => {
      await expect(createSleeperSeason(9_999_999, mockedSleeperLeagueId)).rejects.toEqual(
        new EntityDoesNotExistError(`No league found for that ID`)
      );
    });
  });

  describe('when a non existent sleeperLeagueId is passed in', () => {
    it('throws an exception', async () => {
      const someLeagueName = 'someLeagueName';
      const leagueId = await createLeague(someLeagueName);

      await expect(createSleeperSeason(leagueId, 'DoesNotExist')).rejects.toEqual(
        new EntityDoesNotExistError(`No league found on Sleeper found for SleeperLeagueId DoesNotExist`)
      );
    });
  });
});
