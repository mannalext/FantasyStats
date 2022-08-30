import { League } from '../../src/entities/league';
import { StatsRepository } from '../../src/ports/stats/stats-repository';
import { isNumber } from '../../src/utilities/is-number';
import { getPortsForTesting } from '../helpers/ports-for-testing';

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
});
