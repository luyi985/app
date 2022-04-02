import { Express } from 'express';
import { Client } from 'pg';
export type Envs = {
  POSTGRES_PASSWORD: string;
  POSTGRES_USER: string;
  POSTGRES_HOST: string;
  POSTGRES_PORT: string;
  DB_NAME: string;
  SERVER_PORT: number;
};

export interface SingleService<T, A extends Envs> {
  getInstance(): T;
  init(): Promise<void>;
}
export type AppContext = {
  envs: Envs;
  pgClient: Client;
};

export type ExpressExtended = Express & {
  context: AppContext;
};
export type InstallMiddleware = (app: ExpressExtended) => Promise<void>;
