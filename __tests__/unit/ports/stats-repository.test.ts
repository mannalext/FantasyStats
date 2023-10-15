/* eslint-disable jest/no-commented-out-tests */
import { League } from '@entities/league';
import { Season } from '@entities/season';
import { StatsRepository } from '@ports/stats/stats-repository';
import { isNumber } from '@utilities/is-number';
import { getPortsForTesting } from '../../helpers/ports-for-testing';
import { Team } from '@entities/team';
import { v4 as uuidv4 } from 'uuid';

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
          it('throws an exception', async () => {
            const leagueId = 9_999_999;
            await expect(repo.findLeagueById(leagueId)).rejects.toThrow();
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
          await expect(repo.createSeason(9_999_999)).rejects.toThrow();
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
          it('throws an error', async () => {
            await expect(repo.findSeasonById(-1)).rejects.toThrow();
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
          it('throws an error', async () => {
            const leagueName = 'testLeagueForFindSeasonByLeagueAndYear';
            const leagueId = await repo.createLeague(leagueName);

            await expect(repo.findSeasonByLeagueAndYear(leagueId, new Date().getFullYear())).rejects.toThrow();
          });
        });
      });
    });

    describe('sleeper seasons', () => {
      let sleeperLeagueId: string;
      beforeEach(() => {
        sleeperLeagueId = uuidv4();
      });

      describe('createSleeperSeason', () => {
        describe('when a valid combination of leagueId and sleeperLeagueId is given', () => {
          it('returns the season id', async () => {
            const leagueName = 'testLeagueForSleeperSeasonRepositoryUnitTests';
            const leagueId = await repo.createLeague(leagueName);
            const seasonId = await repo.createSeason(leagueId);

            expect(typeof (await repo.createSleeperSeason(seasonId, sleeperLeagueId))).toBe('number');
          });

          it('creates a sleeper season', async () => {
            const leagueName = 'testLeagueForSleeperSeasonRepositoryUnitTests';
            const leagueId = await repo.createLeague(leagueName);
            const seasonId = await repo.createSeason(leagueId);
            await repo.createSleeperSeason(seasonId, sleeperLeagueId);

            expect(await repo.findSleeperSeasonBySleeperLeagueId(sleeperLeagueId)).toEqual({
              id: seasonId,
              leagueId: leagueId,
              sleeperLeagueId: sleeperLeagueId,
              year: new Date().getFullYear(),
            });
          });
        });

        // it is a business rule that the Season to SleeperSeason relationship is 1:1
        describe('when the sleeper season already exists', () => {
          it('throws an exception', async () => {
            const leagueName = 'testLeagueForSleeperSeasonRepositoryUnitTests';
            const leagueId = await repo.createLeague(leagueName);
            const seasonId = await repo.createSeason(leagueId);
            const repeatedSleeperLeagueId = uuidv4();

            await repo.createSleeperSeason(seasonId, repeatedSleeperLeagueId);

            await expect(repo.createSleeperSeason(seasonId, repeatedSleeperLeagueId)).rejects.toThrow();
          });
        });

        describe('when the Season does not exist', () => {
          it('throws an exception', async () => {
            const nonexistentSeasonId = 9_999_999;
            await expect(repo.createSleeperSeason(nonexistentSeasonId, sleeperLeagueId)).rejects.toThrow();
          });
        });
      });

      describe('findSleeperSeasonBySleeperLeagueId', () => {
        describe('when a valid sleeperLeagueId is given', () => {
          describe('and the season exists', () => {
            it('returns the season', async () => {
              const leagueName = 'testLeagueForSleeperSeasonRepositoryUnitTests';
              const leagueId = await repo.createLeague(leagueName);
              const seasonId = await repo.createSeason(leagueId);
              const sleeperSeasonId = await repo.createSleeperSeason(seasonId, sleeperLeagueId);

              expect(await repo.findSleeperSeasonBySleeperLeagueId(sleeperLeagueId)).toEqual({
                id: sleeperSeasonId,
                leagueId: leagueId,
                sleeperLeagueId: sleeperLeagueId,
                year: new Date().getFullYear(),
              });
            });
          });

          describe('and the season does not exist', () => {
            it('throws an error', async () => {
              await expect(repo.findSleeperSeasonBySleeperLeagueId('-1')).rejects.toThrow();
            });
          });
        });
      });

      describe('findSleeperSeasonBySeasonId', () => {
        describe('when a valid seasonId is given', () => {
          describe('and the season exists', () => {
            it('returns the season', async () => {
              const leagueName = 'testLeagueForSleeperSeasonRepositoryUnitTests';
              const leagueId = await repo.createLeague(leagueName);
              const seasonId = await repo.createSeason(leagueId);
              const sleeperSeasonId = await repo.createSleeperSeason(seasonId, sleeperLeagueId);

              expect(await repo.findSleeperSeasonBySeasonId(seasonId)).toEqual({
                id: sleeperSeasonId,
                leagueId: leagueId,
                sleeperLeagueId: sleeperLeagueId,
                year: new Date().getFullYear(),
              });
            });
          });

          describe('and the season does not exist', () => {
            it('throws an error', async () => {
              await expect(repo.findSleeperSeasonBySeasonId(-1)).rejects.toThrow();
            });
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
          expect(await repo.findOwnerById(ownerId)).toEqual({ id: ownerId, displayName: 'testOwner' });
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
            expect(await repo.findOwnerById(ownerId)).toEqual({ id: ownerId, displayName: 'testOwner' });
          });
        });

        describe('and the owner does not exist', () => {
          it('throws an error', async () => {
            await expect(repo.findOwnerById(-1)).rejects.toThrow();
          });
        });
      });
    });
  });

  describe('teams', () => {
    describe('createTeam', () => {
      describe('when a valid combination of seasonId and ownerId is given', () => {
        const leagueName = 'testLeagueForTeamRepositoryUnitTests';
        let leagueId: number;
        let seasonId: number;
        let ownerId: number;
        let teamId: number;

        beforeAll(async () => {
          leagueId = await repo.createLeague(leagueName);
          seasonId = await repo.createSeason(leagueId);
          ownerId = await repo.createOwner('testUser');
        });

        it('returns the team id', async () => {
          teamId = await repo.createTeam(seasonId, ownerId);
          expect(isNumber(teamId)).toBe(true);
        });

        it('creates a team', async () => {
          const team: Team = {
            id: teamId,
            seasonId,
            ownerId,
            wins: 0,
            losses: 0,
            ties: 0,
          };

          expect(await repo.findTeam(seasonId, ownerId)).toEqual(team);
        });

        it('increments team ids for successively created teams', async () => {
          const newOwnerId = await repo.createOwner('newOwner');
          const newTeamId = await repo.createTeam(seasonId, newOwnerId);
          expect(newTeamId).toEqual(teamId + 1);
        });
      });

      describe('when the given season id does not exist', () => {
        it('throws an exception', async () => {
          await expect(repo.createTeam(-1, 1)).rejects.toThrow();
        });
      });

      describe('when the given owner id does not exist', () => {
        it('throws an exception', async () => {
          const leagueName = 'testLeagueForTeamRepositoryUnitTests';
          const leagueId = await repo.createLeague(leagueName);
          const seasonId = await repo.createSeason(leagueId);
          await expect(repo.createTeam(seasonId, -1)).rejects.toThrow();
        });
      });

      describe('when the team already exists', () => {
        it('throws an exception', async () => {
          const leagueName = 'testLeagueForTeamRepositoryUnitTests';
          const leagueId = await repo.createLeague(leagueName);
          const seasonId = await repo.createSeason(leagueId);
          const ownerId = await repo.createOwner('testUser');
          await repo.createTeam(seasonId, ownerId);

          await expect(repo.createTeam(seasonId, ownerId)).rejects.toThrow();
        });
      });
    });

    describe('findTeam', () => {
      describe('when a valid combination of seasonId and ownerId is given', () => {
        describe('and the team exists', () => {
          it('returns the team', async () => {
            const leagueName = 'testLeagueForTeamRepositoryUnitTests';
            const leagueId = await repo.createLeague(leagueName);
            const seasonId = await repo.createSeason(leagueId);
            const ownerId = await repo.createOwner('testUser');
            const teamId = await repo.createTeam(seasonId, ownerId);
            const team: Team = {
              id: teamId,
              seasonId,
              ownerId,
              wins: 0,
              losses: 0,
              ties: 0,
            };

            expect(await repo.findTeam(seasonId, ownerId)).toEqual(team);
          });
        });

        describe('and the team does not exist', () => {
          it('throws an error', async () => {
            const leagueName = 'testLeagueForTeamRepositoryUnitTests';
            const leagueId = await repo.createLeague(leagueName);
            const seasonId = await repo.createSeason(leagueId);
            const ownerId = await repo.createOwner('testUser');
            await expect(repo.findTeam(seasonId, ownerId)).rejects.toThrow();
          });
        });
      });

      describe('when invalid inputs are given', () => {
        it('throws an error when the season id is invalid', async () => {
          const leagueName = 'testLeagueForTeamRepositoryUnitTests';
          const leagueId = await repo.createLeague(leagueName);
          const seasonId = await repo.createSeason(leagueId);
          const ownerId = await repo.createOwner('testUser');
          await expect(repo.findTeam(seasonId, ownerId)).rejects.toThrow();
        });

        it('throws an error when the owner id is invalid', async () => {
          const leagueName = 'testLeagueForTeamRepositoryUnitTests';
          const leagueId = await repo.createLeague(leagueName);
          const seasonId = await repo.createSeason(leagueId);
          const ownerId = await repo.createOwner('testUser');
          await expect(repo.findTeam(seasonId, ownerId)).rejects.toThrow();
        });
      });
    });

    describe('findTeamById', () => {
      describe('when a valid team id is given', () => {
        describe('and the team exists', () => {
          it('returns the team', async () => {
            const leagueName = 'testLeagueForTeamRepositoryUnitTests';
            const leagueId = await repo.createLeague(leagueName);
            const seasonId = await repo.createSeason(leagueId);
            const ownerId = await repo.createOwner('testUser');
            const teamId = await repo.createTeam(seasonId, ownerId);
            const team: Team = {
              id: teamId,
              seasonId,
              ownerId,
              wins: 0,
              losses: 0,
              ties: 0,
            };

            expect(await repo.findTeamById(teamId)).toEqual(team);
          });
        });

        describe('and the team does not exist', () => {
          it('throws an error', async () => {
            await expect(repo.findTeamById(-1)).rejects.toThrow();
          });
        });
      });
    });
  });
});
