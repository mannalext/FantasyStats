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


// TODO: write a script that parses the json and actually does some inserts
