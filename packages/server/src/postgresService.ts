import { SingleService } from './types';
import { PoolClient } from 'pg';

export const postgresService: SingleService<any> = (envs) => {
  const { POSTGRES_PASSWORD, POSTGRES_USER } = envs;
};
