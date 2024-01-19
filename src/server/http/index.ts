import { createServer, Server } from 'http';
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';

import { logger } from '@/utils/logging/logger';

export function initServer(): Server {
  const app = express();

  app.use(helmet());

  morgan.token('json', (req: any, res: any) =>
    JSON.stringify({
      method: req.method,
      url: req.url,
      body: req.body,
      statusCode: res.statusCode,
      resBody: res.body,
      pid: process.pid,
      ip: req.connection.remoteAddress,
      user: req.user,
    }),
  );
  app.use(
    morgan((token, req, res) => token.json(req, res), {
      skip: (req, res) => res.statusCode >= 400,
      stream: {
        write: (text: string) => {
          const log = text.replace(/\n$/, '');
          const { method, url, statusCode, ...json } = JSON.parse(log);
          logger.http({
            message: `${statusCode} ${method} ${url}`,
            ...json,
          });
        },
      },
    }),
  );
  app.use(
    morgan((tokens, req, res) => tokens.json(req, res), {
      skip: (req, res) => res.statusCode < 400,
      stream: {
        write: (text: string) => {
          const log = text.replace(/\n$/, '');
          const { method, url, statusCode, ...json } = JSON.parse(log);
          logger.error({
            message: `${statusCode} ${method} ${url}`,
            ...json,
          });
        },
      },
    }),
  );

  return createServer(app);
}
