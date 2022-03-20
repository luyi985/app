import { Client } from 'pg';
import { createClient, createPool, getSql, envs } from './helpers';

const createDB = (client: Client) => async (dbName: string) => {
  const isExisting = Boolean(
    (
      await client?.query(
        `select datname from pg_database where datname='${dbName}'`
      )
    )?.rows.length
  );
  if (isExisting) return;
  await client?.query(`CREATE DATABASE ${dbName};`);
};

const main = async () => {
  const client = await createClient();
  try {
    if (!client) throw new Error('Failed to connect postgres server');
    const toCreateDB = createDB(client);
    await toCreateDB(envs.DB_NAME);
    const pool = await createPool();
    const queryString = getSql('createTable');
    await pool?.query(queryString);
    console.info('Done!');
    client.end();
    process.exit(0);
  } catch (e) {
    console.error(`Error: ${(e as Error).message}`);
    client?.end();
    process.exit(0);
  }
};

main();
