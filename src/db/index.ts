import { Pool, QueryResult } from 'pg';

const pool = new Pool({
  host: 'localhost',
  database: 'fantasy-stats-database',
  password: 'pgpassword',
  user: 'pguser',
  port: 5432,
});

export const query = async (query: string, params?: unknown[]): Promise<QueryResult> =>
  await pool.query(query, params);
