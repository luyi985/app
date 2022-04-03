import { createServer } from 'http';
import express from 'express';
import { AppContext, Envs, ExpressExtended } from './types';
import { installPostgresSubscriptionMiddleware } from './installPostgresSubscriptionMiddleware';
import { pgService } from './postgresService';
import { installShowInfoMiddleware } from './installShowInfoMiddleware';

const main = async () => {
  try {
    const envs = process.env as unknown as Envs;
    await pgService.init();
    const appContext: AppContext = { envs, ...pgService.getInstance() };
    const app: ExpressExtended = express() as ExpressExtended;
    app.context = appContext;
    await installShowInfoMiddleware(app);
    await installPostgresSubscriptionMiddleware(app);
    const httpServer = createServer(app);
    httpServer.listen(envs.SERVER_PORT, () => {
      console.info(`server is running at ${envs.SERVER_PORT}`);
    });
  } catch (e) {
    console.error((e as Error)?.message);
  }
};

main();
