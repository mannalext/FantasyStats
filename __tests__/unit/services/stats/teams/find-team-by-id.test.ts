import { EntityDoesNotExistError } from '@services/errors';
import { createLeague } from '@services/stats/leagues/create-league';
import { createOwner } from '@services/stats/owners/create-owner';
import { createSeason } from '@services/stats/seasons/create-season';
import { createTeam } from '@services/stats/teams/create-team';
import { findTeamById } from '@services/stats/teams/find-team-by-id';

describe('findTeamById service', () => {
  describe('when a team exists with the given teamId', () => {
    it('returns it', async () => {
      const leagueName = 'someLeagueName';
      const ownerName = 'someOwnerName';
      const leagueId = await createLeague(leagueName);
      const seasonId = await createSeason(leagueId);
      const ownerId = await createOwner(ownerName);
      const teamId = await createTeam(seasonId, ownerId);
      const someTeam = {
        id: teamId,
        seasonId,
        ownerId,
        wins: 0,
        losses: 0,
        ties: 0,
      };
      const team = await findTeamById(teamId);
      expect(team).toEqual(someTeam);
    });
  });

  describe('when a team does not exist with the given teamId', () => {
    it('throws an exception', async () => {
      await expect(findTeamById(9_999_999)).rejects.toEqual(
        new EntityDoesNotExistError(`Team does not exist for team id 9999999`)
      );
    });
  });
});
