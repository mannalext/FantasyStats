import { League } from '@entities/league';
import { Season } from '@entities/season';
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

  describe('leagues', () => {
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

  describe('seasons', () => {
    describe('createSeason', () => {
      describe('when a valid combination of league_id and year is given', () => {
        const leagueName = 'testLeagueForSeasonRepositoryUnitTests';
        let leagueId: number;
        let seasonId: number;

        beforeAll(async () => {
          leagueId = await repo.createLeague(leagueName);
          seasonId = await repo.createSeason(leagueId);
        });

        it('returns the season id', () => {
          expect(isNumber(seasonId)).toBe(true);
        });

        it('creates a season', async () => {
          const season: Season = {
            id: seasonId,
            leagueId: leagueId,
            year: new Date().getFullYear(),
          };

          expect(await repo.findSeasonById(seasonId)).toEqual(season);
        });

        it('increments season ids for successively created seasons', async () => {
          const newLeagueId = await repo.createLeague(leagueName);
          const newSeasonId = await repo.createSeason(newLeagueId);

          expect(newSeasonId).toEqual(seasonId + 1);
        });
      });

      describe('when the given league id does not exist', () => {
        it('throws an exception', async () => {
          await expect(repo.createSeason(69)).rejects.toThrow();
        });
      });

      describe('when the season already exists', () => {
        it('throws an exception', async () => {
          const leagueName = 'testLeagueForAlreadyExistingSeason';
          const leagueId = await repo.createLeague(leagueName);
          await repo.createSeason(leagueId);

          await expect(repo.createSeason(leagueId)).rejects.toThrow();
        });
      });
    });

    describe('findSeasonById', () => {
      describe('when a valid season id is given', () => {
        describe('and the season exists', () => {
          it('returns the season', async () => {
            const leagueName = 'testLeagueForFindSeasonById';
            const leagueId = await repo.createLeague(leagueName);
            const seasonId = await repo.createSeason(leagueId);
            const season: Season = {
              id: seasonId,
              leagueId: leagueId,
              year: new Date().getFullYear(),
            };

            expect(await repo.findSeasonById(seasonId)).toEqual(season);
          });
        });

        describe('and the season does not exist', () => {
          it('returns undefined', async () => {
            expect(await repo.findSeasonById(9_999_999)).toEqual(undefined);
          });
        });
      });
    });

    describe('findSeasonByLeagueAndYear', () => {
      describe('when a valid league id and year are given', () => {
        describe('and the season exists', () => {
          it('returns the season', async () => {
            const leagueName = 'testLeagueForFindSeasonByLeagueAndYear';
            const leagueId = await repo.createLeague(leagueName);
            const seasonId = await repo.createSeason(leagueId);
            const season: Season = {
              id: seasonId,
              leagueId: leagueId,
              year: new Date().getFullYear(),
            };

            expect(await repo.findSeasonByLeagueAndYear(leagueId, new Date().getFullYear())).toEqual(season);
          });
        });

        describe('and the season does not exist', () => {
          it('returns undefined', async () => {
            expect(await repo.findSeasonByLeagueAndYear(1, 2020)).toEqual(undefined);
          });
        });
      });
    });
  });

  // TODO: add negative tests (invalid inputs, etc.
  // TODO: probably need better negative case handling for those tests to make sense)
  describe('owners', () => {
    describe('createOwner', () => {
      describe('when a valid owner name is given', () => {
        it('returns the owner id', async () => {
          const ownerId = await repo.createOwner('testOwner');
          expect(isNumber(ownerId)).toBe(true);
        });

        it('creates an owner', async () => {
          const ownerId = await repo.createOwner('testOwner');
          expect(await repo.findOwnerById(ownerId)).toEqual({ id: ownerId, display_name: 'testOwner' });
        });

        it('increments owner ids for successively created owners', async () => {
          const newOwnerId = await repo.createOwner('newOwner');
          const anotherNewOwnerId = await repo.createOwner('anotherNewOwner');
          expect(anotherNewOwnerId).toEqual(newOwnerId + 1);
        });
      });
    });

    describe('findOwnerById', () => {
      describe('when a valid owner id is given', () => {
        describe('and the owner exists', () => {
          it('returns the owner', async () => {
            const ownerId = await repo.createOwner('testOwner');
            expect(await repo.findOwnerById(ownerId)).toEqual({ id: ownerId, display_name: 'testOwner' });
          });
        });

        describe('and the owner does not exist', () => {
          it('returns undefined', async () => {
            expect(await repo.findOwnerById(9_999_999)).toEqual(undefined);
          });
        });
      });
    });
  });
});
