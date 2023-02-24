import { League } from '@entities/league';
import { StatsRepository } from '@ports/stats/stats-repository';
import { findLeagueById } from '@services/stats/leagues/find-league-by-id';
import { isNumber } from '@utilities/is-number';
import { getPortsForTesting } from '../../helpers/ports-for-testing';

describe('stats-repository', () => {
  let repo: StatsRepository;
  let ports;

  beforeAll(() => {
    ports = getPortsForTesting();
    repo = ports.statsRepository;
  });

  describe('createLeague', () => {
    describe('when a valid league name is given', () => {
      const leagueName = 'testLeague';
      let leagueId: number;

      beforeAll(async () => {
        leagueId = await repo.createLeague(leagueName);
      });

      it('returns the league id', () => {
        expect(isNumber(leagueId)).toBe(true);
      });

      it('creates a league', async () => {
        const league: League = {
          id: leagueId,
          name: leagueName,
        };
        expect(await repo.findLeagueById(leagueId)).toEqual(league);
      });

      it('increments league ids for successively created leagues', async () => {
        const newLeagueId = await repo.createLeague('newLeague)');
        const anotherNewLeagueId = await repo.createLeague('anotherNewLeague');
        expect(anotherNewLeagueId).toEqual(newLeagueId + 1);
      });
    });
  });

  describe('findLeagueById', () => {
    describe('when a valid leagueId is given', () => {
      describe('if the league exists', () => {
        const leagueName = 'testLeague';
        let leagueId: number;

        beforeAll(async () => {
          leagueId = await repo.createLeague(leagueName);
        });

        it('returns the league', async () => {
          const expectedLeague: League = {
            name: 'testLeague',
            id: leagueId,
          };

          const league = await repo.findLeagueById(leagueId);

          expect(league).toEqual(expectedLeague);
        });
      });

      describe('if the league does not exist', () => {
        it('returns undefined', async () => {
          const league = await findLeagueById(9_999_999);
          expect(league).toEqual(undefined);
        });
      });
    });
  });
});
