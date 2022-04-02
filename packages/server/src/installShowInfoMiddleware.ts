import { AppContext, InstallMiddleware } from './types';

import { Express } from 'express';

export const installShowInfoMiddleware: InstallMiddleware = async (app) => {
  const contest = app.context;
  app.get('/info', (req, res) => {
    res.json({ msg: 'Info middleware', envs: contest.envs });
  });
};
