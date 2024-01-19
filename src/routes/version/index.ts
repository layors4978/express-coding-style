import { Router } from 'express';

import { versionCheck } from './versionCheck';

export const versionRouter = Router();

versionRouter.get('', versionCheck);
