import { insert } from '@/db/seasons';
import { query } from '@/db';

jest.mock('@/db');

describe('seasons db queries', () => {
  describe(insert, () => {
    it('inserts the season with id, league id, and year', async () => {
      await insert({
        seasonId: 1,
        leagueId: 2,
        year: 2000,
      });
      expect(query).toHaveBeenCalledWith(
        'INSERT INTO seasons (season_id, league_id, year) VALUES ($1, $2, $3)',
        [ 1, 2, 2000 ],
      );
    });
  });
});
