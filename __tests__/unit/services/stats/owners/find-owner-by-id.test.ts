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
      });
    });
  });

  describe('when an id that does not belong to an existing owner is passed in', () => {
    it('returns undefined', async () => {
      const owner = await findOwnerById(69);
      expect(owner).toBeUndefined();
    });
  });
});
