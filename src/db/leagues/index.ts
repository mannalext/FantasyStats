import { query } from '@/db';

export const insert = async (name: string): Promise<void> => {
  await query('INSERT INTO leagues (name) VALUES ($1)', [ name ]);
};

export const select = async (leagueId: string): Promise<void> => {
  await query('SELECT * FROM leagues WHERE league_id = $1', [ leagueId ]);
};
