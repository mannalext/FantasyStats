import { SleeperSeason } from '@entities/season';
import { EntityDoesNotExistError } from '@services/errors';
import { createLeague } from '@services/stats/leagues/create-league';
import { createSleeperSeason } from '@services/stats/seasons/sleeperSeasons/create-sleeper-season';
import { server } from '../../../../../helpers/mocks/server';
import { StatsRepository } from '@ports/stats/stats-repository';
import { getPortsForTesting } from '../../../../../helpers/ports-for-testing';
import { findSeasonByLeagueAndYear } from '@services/stats/seasons/find-season-by-league-and-year';
import { findSleeperSeasonBySeasonId } from '@services/stats/seasons/sleeperSeasons/find-sleeper-season-by-season-id';

describe('findSleeperSeasonByseasonId service', () => {
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

  describe('when a SleeperSeason exists with the given seasonId', () => {
    it('returns it', async () => {
      const leagueName = 'someLeagueName';
      const leagueId = await createLeague(leagueName);
      await createSleeperSeason(leagueId, mockedSleeperLeagueId);
      const season = await findSeasonByLeagueAndYear(leagueId, new Date().getFullYear());
      const someSleeperSeason: SleeperSeason = {
        id: season.id,
        leagueId,
        sleeperLeagueId: mockedSleeperLeagueId,
        year: new Date().getFullYear(),
      };

      const sleeperSeason = await findSleeperSeasonBySeasonId(season.id);

      expect(someSleeperSeason).toEqual(sleeperSeason);
      await repo.deleteSleeperSeason(mockedSleeperLeagueId);
    });
  });

  describe('when a sleeper season does not exist with the given seasonId', () => {
    it('returns throws an EntityDoesNotExistError', async () => {
      await expect(findSleeperSeasonBySeasonId(9_999_999)).rejects.toEqual(
        new EntityDoesNotExistError('No Sleeper season found for seasonId 9999999')
      );
    });
  });
});
