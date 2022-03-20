import { Express } from 'express';
export type Envs = {
  POSTGRES_PASSWORD: string;
  POSTGRES_USER: string;
  POSTGRES_HOST: string;
  POSTGRES_PORT: string;
  DB_NAME: string;
  SERVER_PORT: number;
};
export type SingleService<T> = (envs: Envs) => T;
export type InstallMiddleware = (app: Express) => void;

export type AppContext = {
  envs: Envs;
};
