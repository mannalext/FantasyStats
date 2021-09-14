import { SeasonInsertValues } from '@/types';
import { query } from '@/db';

export const insert = async (seasonInsertValues: SeasonInsertValues): Promise<void> => {
  await query(
    'INSERT INTO seasons (season_id, league_id, year) VALUES ($1, $2, $3)',
    [
      seasonInsertValues.seasonId,
      seasonInsertValues.leagueId,
      seasonInsertValues.year,
    ],
  );
};

export const select = async (seasonId: number): Promise<void> => {
  await query(
    'SELECT * FROM seasons WHERE season_id = $1',
    [ seasonId ],
  );
};
