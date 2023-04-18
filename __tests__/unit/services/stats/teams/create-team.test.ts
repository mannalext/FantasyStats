import { EntityAlreadyExistsError, EntityDoesNotExistError } from '@services/errors';
import { createLeague } from '@services/stats/leagues/create-league';
import { createOwner } from '@services/stats/owners/create-owner';
import { createSeason } from '@services/stats/seasons/create-season';
import { createTeam } from '@services/stats/teams/create-team';
import { findTeam } from '@services/stats/teams/find-team';

describe('createTeam service', () => {
  describe('when a unique combination of season and owner is passed in', () => {
    it('creates a team', async () => {
      const someLeagueName = 'someLeagueNameUnique';
      const leagueId = await createLeague(someLeagueName);
      const seasonId = await createSeason(leagueId);
      const ownerId = await createOwner('someOwnerName');
      const teamId = await createTeam(seasonId, ownerId);
      const team = await findTeam(seasonId, ownerId);
      expect(team).toEqual({
        seasonId,
        id: teamId,
        ownerId,
        wins: 0,
        losses: 0,
        ties: 0,
      });
    });
  });

  describe('when a non unique combination of season and owner is passed in', () => {
    it('throws an EntityAlreadyExistsError', async () => {
      const someLeagueName = 'someLeagueName';
      const leagueId = await createLeague(someLeagueName);
      const seasonId = await createSeason(leagueId);
      const ownerId = await createOwner('someOwnerName');
      await createTeam(seasonId, ownerId);
      await expect(createTeam(seasonId, ownerId)).rejects.toEqual(
        new EntityAlreadyExistsError(`Team already exists for season id ${seasonId} and owner id ${ownerId}`)
      );
    });
  });

  describe('when invalid or nonexistent inputs are given', () => {
    it('throws an exception for a nonexistent season', async () => {
      const seasonId = 9_999_999;
      const ownerId = await createOwner('someOwnerName');
      await expect(createTeam(seasonId, ownerId)).rejects.toEqual(
        new EntityDoesNotExistError(`No season found for season id ${seasonId}`)
      );
    });

    it('throws an exception for a nonexistent owner', async () => {
      const someLeagueName = 'someLeagueName';
      const leagueId = await createLeague(someLeagueName);
      const seasonId = await createSeason(leagueId);
      const ownerId = 9_999_999;
      await expect(createTeam(seasonId, ownerId)).rejects.toEqual(
        new EntityDoesNotExistError(`No owner found for owner id ${ownerId}`)
      );
    });
  });
});
