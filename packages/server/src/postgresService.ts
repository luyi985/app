import { Envs, SingleService } from './types';
import { Client, Pool } from 'pg';
import { createClient } from './setup/helpers';

export class PostgresService implements SingleService<Client, Envs> {
  private client: Client | undefined = undefined;
  getInstance(): Client {
    if (this.client) return this.client;
    throw new Error('Failed to create client');
  }
  async init(): Promise<void> {
    this.client = this.client ?? (await createClient());
    if (!this.client) throw new Error('Failed to create client');
  }
}

export const pgService = new PostgresService();
