import { createServer } from 'http';
import express from 'express';
import { AppContext, Envs } from './types';
import { installPostgresMiddleware } from './installPostgresMiddleware';

const envs: Envs = process.env as unknown as Envs;
const appContext: AppContext = { envs };
const app = express();
app.set('context', appContext);

app.get('/info', (req, res) => {
  res.json({ name: 'Server', envs });
});

installPostgresMiddleware(app);

const httpServer = createServer(app);

const main = () => {
  try {
    httpServer.listen(envs.SERVER_PORT, () => {
      console.info(`server is running at ${envs.SERVER_PORT}`);
    });
  } catch (e) {
    console.error((e as Error)?.message);
  }
};

main();
