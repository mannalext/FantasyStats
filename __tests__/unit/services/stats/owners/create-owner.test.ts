import { createOwner } from '@services/stats/owners/create-owner';
import { findOwnerById } from '@services/stats/owners/find-owner-by-id';

describe('createOwner service', () => {
  describe('when a valid owner name is passed in', () => {
    it('creates an owner', async () => {
      const ownerName = 'someOwnerName';
      const ownerId = await createOwner(ownerName);
      const owner = await findOwnerById(ownerId);
      expect(owner).toEqual({
        id: ownerId,
        displayName: ownerName,
      });
    });

    it('creates an owner with a unique id', async () => {
      const ownerName = 'someOwnerName';
      const ownerId1 = await createOwner(ownerName);
      const ownerId2 = await createOwner(ownerName);
      expect(ownerId1).not.toEqual(ownerId2);
    });
  });

  // TODO: this test will make sese when there is better error handling
  // describe('when an invalid owner name is passed in', () => {
  //   it('throws an exception', async () => {
  //     await expect(createOwner('')).rejects.toThrow();
  //   });
  // });
});
