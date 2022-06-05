import { Pool, QueryResult } from 'pg';

const pool = new Pool({
  host: 'localhost',
  database: 'postgres',
  password: 'admin',
  user: 'postgres',
  port: 5432,
});

export const query = async (query: string, parameters?: unknown[]): Promise<QueryResult> =>
  await pool.query(query, parameters);