import { insert } from '@/db/leagues';
import { query } from '@/db';

jest.mock('@/db');

describe('leagues db queries', () => {
  describe(insert, () => {
    it('inserts the league with name', async () => {
      await insert('some_name');
      expect(query).toHaveBeenCalledWith(
        'INSERT INTO leagues (name) VALUES ($1)',
        [ 'some_name' ],
      );
    });
  });
});
