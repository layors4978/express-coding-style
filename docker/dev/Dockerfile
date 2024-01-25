FROM node:18.15.0-alpine

WORKDIR /app

RUN apk add --no-cache bash dumb-init

COPY . /app

RUN npm i\
  npm run build

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

ENTRYPOINT ["/usr/bin/dumb-init", "--" ,"./scripts/entry.sh" ]

EXPOSE 3000
