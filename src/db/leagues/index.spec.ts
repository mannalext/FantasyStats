import { insert, select } from '@/db/leagues';
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

  describe(select, () => {
    it('selects the league with league_id', async () => {
      await select('some_league_id');
      expect(query).toHaveBeenCalledWith(
        'SELECT * FROM leagues WHERE league_id = $1',
        [ 'some_league_id' ],
      );
    });
  });
});
