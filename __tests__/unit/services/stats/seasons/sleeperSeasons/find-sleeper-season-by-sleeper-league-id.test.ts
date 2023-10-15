import { SleeperSeason } from '@entities/season';
import { EntityDoesNotExistError } from '@services/errors';
import { createLeague } from '@services/stats/leagues/create-league';
import { createSeason } from '@services/stats/seasons/create-season';
import { findSeasonById } from '@services/stats/seasons/find-season-by-id';
import { createSleeperSeason } from '@services/stats/seasons/sleeperSeasons/create-sleeper-season';
import { findSleeperSeasonBySleeperLeagueId } from '@services/stats/seasons/sleeperSeasons/find-sleeper-season-by-sleeper-league-id';
import { server } from '../../../../../helpers/mocks/server';
import { StatsRepository } from '@ports/stats/stats-repository';
import { getPortsForTesting } from '../../../../../helpers/ports-for-testing';

describe('findSleeperSeasonBySleeperLeagueId service', () => {
  const mockedSleeperLeagueId = '1234';
  let ports;
  let repo: StatsRepository;

  beforeAll(() => {
    server.listen();
    ports = getPortsForTesting();
    repo = ports.statsRepository;
  });
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  describe('when a SleeperSeason exists with the given sleeperLeagueId', () => {
    it('returns it', async () => {
      const leagueName = 'someLeagueName';
      const leagueId = await createLeague(leagueName);
      const seasonId = await createSeason(leagueId);
      await createSleeperSeason(seasonId, mockedSleeperLeagueId);

      const someSleeperSeason: SleeperSeason = {
        id: seasonId,
        leagueId,
        sleeperLeagueId: mockedSleeperLeagueId,
        year: new Date().getFullYear(),
      };

      const sleeperSeason = await findSleeperSeasonBySleeperLeagueId(mockedSleeperLeagueId);

      expect(someSleeperSeason).toEqual(sleeperSeason);
      await repo.deleteSleeperSeason(mockedSleeperLeagueId);
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
