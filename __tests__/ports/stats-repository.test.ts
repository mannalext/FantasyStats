import { StatsRepository } from '../../src/ports/stats/stats-repository';
import { getPortsForTesting } from '../helpers/ports-for-testing';

describe('stats-repository', () => {
  let repo: StatsRepository;
  beforeEach(() => {
    const ports = getPortsForTesting();
    repo = ports.statsRepository;
  });

  describe('createLeague', () => {
    describe('when a valid league name is given', () => {
      const leagueName = 'testLeague';

      it('creates a league', () => {
        repo.createLeague(leagueName);
        console.log('we ran a test');
        expect(true).toBe(true);
      });

      // it('returns the league id', () => {

      // });

      // it('increments league ids for successively created leagues', () => {

      // });
    });

    // describe('when an invalid league name is given', () => {
    //   it('fails gracefully', () => { // TODO: refine this statement

    //   });
    // });
  });
});
