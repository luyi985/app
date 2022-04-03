import { Envs, SingleService } from './types';
import { Client, Pool, PoolClient } from 'pg';
import { createClient, createPool } from './setup/helpers';

export class PostgresService
  implements SingleService<{ client: Client; pool: PoolClient }, Envs>
{
  private client: Client | undefined = undefined;
  private pool: PoolClient | undefined;
  getInstance(): { client: Client; pool: PoolClient } {
    if (this.client && this.pool)
      return { client: this.client, pool: this.pool };
    throw new Error('Failed to create client');
  }
  async init(): Promise<void> {
    this.client = this.client ?? (await createClient());
    this.pool = this.pool ?? (await createPool());
    if (!this.client) throw new Error('Failed to create client');
    if (!this.pool) throw new Error('Failed to create pool');
  }
}

export const pgService = new PostgresService();
