import { Pool, QueryResult } from 'pg';
import { Configuration } from '../../configuration';
import { PrismaClient } from '@prisma/client';

const databaseConfig = new Configuration().getDatabaseConfig();

const pool = new Pool(databaseConfig);

export const query = async (query: string, parameters?: unknown[]): Promise<QueryResult> =>
  await pool.query(query, parameters);

export const prisma = new PrismaClient();
