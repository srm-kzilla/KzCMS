import express from 'express';

import config from './config';
import Loaders from './loaders';
import Logger from './loaders/logger';

async function startServer() {
  const app = express();

  await Loaders({ expressApp: app });

  app
    .listen(config.port, () => {
      Logger.info(`
      ####################################################
      🛡️  Server listening on http://localhost:${config.port} 🛡️
      ####################################################
    `);
    })
    .on('error', err => {
      Logger.error(err);
      process.exit(1);
    });
}

startServer();
