#!/bin/bash

./scripts/wait.sh $POSTGRES_HOST:$POSTGRES_PORT -t 0
# ./scripts/wait.sh $REDIS_HOST:$REDIS_PORT -t 0

if [ "$NODE_ENV" = "production" ]; then
  npm start
else
  npm run start:dev:docker
fi
