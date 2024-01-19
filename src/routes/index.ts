import { Router } from 'express';

import { versionRouter } from './version';

export const apiRouter = Router();

apiRouter.use(versionRouter);
