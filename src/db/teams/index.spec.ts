import { insert, select } from '@/db/teams';
import { query } from '@/db';

jest.mock('@/db');

describe('teams db queries', () => {
  describe(insert, () => {
    it('inserts the team with id, league id, and year', async () => {
      await insert({
        seasonId: 1,
        ownerId: 2,
        wins: 10,
        losses: 7,
        ties: 0,
      });
      expect(query).toHaveBeenCalledWith(
        'INSERT INTO teams (season_id, owner_id, wins, losses, ties) VALUES ($1, $2, $3, $4, $5)',
        [ 1, 2, 10, 7, 0 ],
      );
    });
  });
  describe(select, () => {
    it('selects the team with season_id and owner_id', async () => {
      await select(1, 2);
      expect(query).toHaveBeenLastCalledWith(
        'SELECT * FROM teams WHERE season_id = $1 AND owner_id = $2',
        [ 1, 2 ],
      );
    });
  });
});
