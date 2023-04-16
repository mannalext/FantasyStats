import { Pool, QueryResult } from 'pg';
import { Configuration } from '../../configuration';
import { PrismaClient } from '@prisma/client';

// TODO: remove this old db config once prisma is fully implemented
const databaseConfig = new Configuration().getDatabaseConfig();

const pool = new Pool(databaseConfig);

export const query = async (query: string, parameters?: unknown[]): Promise<QueryResult> =>
  await pool.query(query, parameters);

interface PrismaGlobal {
  prisma: PrismaClient;
}

declare const global: PrismaGlobal;

const prisma = global.prisma || new PrismaClient();

// if (process.env.NODE_ENV === 'development') global.prisma = prisma;

export default prisma;
