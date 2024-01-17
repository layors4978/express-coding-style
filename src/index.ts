import { initServer as initHttpServer } from './server/http';

import { HTTP_PORT } from './env';
import { logger } from './utils/logging/logger';

async function main(): Promise<void> {
  initHttpServer().listen(HTTP_PORT, () => {
    logger.info(`HTTP Server is listening on port ${HTTP_PORT}`);
  });
}

main();
