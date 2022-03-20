import { Client, Pool } from 'pg';
import { Envs } from '../types';
import fs from 'fs';
import path from 'path';

export const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_HOST,
  POSTGRES_PORT,
  DB_NAME,
} = process.env as unknown as Envs;

export const envs = {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_HOST,
  POSTGRES_PORT,
  DB_NAME,
};
export const createClient = async () => {
  try {
    const client = new Client({
      host: POSTGRES_HOST,
      port: parseInt(POSTGRES_PORT) || 5432,
      user: POSTGRES_USER,
      password: POSTGRES_PASSWORD,
    });
    await client.connect();
    console.log('Postgres server connected');
    return client;
  } catch (e) {
    console.error(e);
  }
};

export const createPool = async () => {
  try {
    const pool = new Pool({
      database: DB_NAME,
      host: POSTGRES_HOST,
      port: parseInt(POSTGRES_PORT) || 5432,
      user: POSTGRES_USER,
      password: POSTGRES_PASSWORD,
    });
    const poolClient = await pool.connect();
    console.log(`DB ${DB_NAME} pool connected`);
    return poolClient;
  } catch (e) {
    console.error(e);
  }
};

export const getSql = (fileName: string): string => {
  return fs
    .readFileSync(path.join(process.cwd(), `/sql/${fileName}.sql`))
    .toString();
};
