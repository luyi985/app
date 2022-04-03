import { AppContext, InstallMiddleware } from './types';

import { Express } from 'express';

export const installPostgresSubscriptionMiddleware: InstallMiddleware = async (
  app
) => {
  const { pool } = app.context;
  await pool.query('LISTEN pub_sub');
  pool.on('notification', (msg) => {
    console.log('====================', typeof msg);
    console.log(msg.payload);
  });

  app.get('/pgSubPub', (req, res) => {
    res.json({ msg: 'Installed PostgresSubscriptionMiddleware' });
  });
};
