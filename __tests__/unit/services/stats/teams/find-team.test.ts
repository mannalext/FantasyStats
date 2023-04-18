import { EntityDoesNotExistError } from '@services/errors';
import { createLeague } from '@services/stats/leagues/create-league';
import { createOwner } from '@services/stats/owners/create-owner';
import { createSeason } from '@services/stats/seasons/create-season';
import { createTeam } from '@services/stats/teams/create-team';
import { findTeam } from '@services/stats/teams/find-team';

describe('findTeam service', () => {
  describe('when a team exists with the given seasonId and ownerId', () => {
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

      const team = await findTeam(seasonId, ownerId);

      expect(team).toEqual(someTeam);
    });
  });

  describe('when a team does not exist with the given seasonId and ownerId', () => {
    it('returns throws an EntityDoesNotExistError', async () => {
      const leagueName = 'someLeagueName';
      const ownerName = 'someOwnerName';
      const leagueId = await createLeague(leagueName);
      const seasonId = await createSeason(leagueId);
      const ownerId = await createOwner(ownerName);

      await expect(findTeam(seasonId, ownerId)).rejects.toEqual(
        new EntityDoesNotExistError(`Team does not exist for season id ${seasonId} and owner id ${ownerId}`)
      );
    });
  });

  describe('when invalid or nonexistent inputs are given', () => {
    it('throws an exception when given a non existent seasonId', async () => {
      const ownerName = 'someOwnerName';
      const ownerId = await createOwner(ownerName);
      const nonExistentSeasonId = 9_999_999;

      await expect(findTeam(nonExistentSeasonId, ownerId)).rejects.toEqual(
        new EntityDoesNotExistError(`No season found for season id ${nonExistentSeasonId}`)
      );
    });

    it('throws an exception when given a non existent ownerId', async () => {
      const leagueName = 'someLeagueName';
      const leagueId = await createLeague(leagueName);
      const seasonId = await createSeason(leagueId);
      const nonExistentOwnerId = 9_999_999;

      await expect(findTeam(seasonId, nonExistentOwnerId)).rejects.toEqual(
        new EntityDoesNotExistError(`No owner found for owner id ${nonExistentOwnerId}`)
      );
    });
  });
});
