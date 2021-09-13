import { insert } from '@/db/owners';
import { query } from '@/db';

jest.mock('@/db');

describe('owners db queries', () => {
  describe(insert, () => {
    it('inserts the owner with id and name', async () => {
      await insert({
        ownerId: 1234567890,
        displayName: 'league-winner-69',
      });
      expect(query).toHaveBeenCalledWith(
        'INSERT INTO owners (owner_id, display_name) VALUES ($1, $2)',
        [ 1234567890, 'league-winner-69' ],
      );
    });
  });
});
