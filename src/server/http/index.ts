import { createServer, Server } from 'http';
import express from 'express';

export function initServer(): Server {
  const app = express();
  return createServer(app);
}
