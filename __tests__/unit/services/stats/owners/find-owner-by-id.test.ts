import { EntityDoesNotExistError } from '@services/errors';
import { createOwner } from '@services/stats/owners/create-owner';
import { findOwnerById } from '@services/stats/owners/find-owner-by-id';

describe('findOwnerById service', () => {
  describe('when a valid owner id is passed in', () => {
    it('returns an owner', async () => {
      const ownerName = 'someOwnerName';
      const ownerId = await createOwner(ownerName);
      const owner = await findOwnerById(ownerId);
      expect(owner).toEqual({
        id: ownerId,
        displayName: ownerName,
        sleeperUserId: null,
      });
    });
  });

  describe('when an id that does not belong to an existing owner is passed in', () => {
    it('throws an EntityDoesNotExistError', async () => {
      await expect(findOwnerById(-1)).rejects.toEqual(new EntityDoesNotExistError('No owner found for owner id -1'));
    });
  });
});
