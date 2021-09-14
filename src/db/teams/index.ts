import { TeamInsertValues } from '@/types';
import { query } from '@/db';

export const insert = async (teamInsertValues: TeamInsertValues): Promise<void> => {
  await query(
    'INSERT INTO teams (season_id, owner_id, wins, losses, ties) VALUES ($1, $2, $3, $4, $5)',
    [
      teamInsertValues.seasonId,
      teamInsertValues.ownerId,
      teamInsertValues.wins,
      teamInsertValues.losses,
      teamInsertValues.ties,
    ],
  );
};

export const select = async (seasonId: number, ownerId: number): Promise<void> => {
  await query(
    'SELECT * FROM teams WHERE season_id = $1 AND owner_id = $2',
    [
      seasonId,
      ownerId,
    ],
  );
};
// TODO: write a script that parses the json and actually does some inserts
