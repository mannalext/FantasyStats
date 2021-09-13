import { query } from '@/db';

export const insert = async (name: string): Promise<void> => {
  await query('INSERT INTO leagues (name) VALUES ($1)', [ name ]);
};
