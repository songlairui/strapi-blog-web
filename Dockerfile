# docker build -t next_base .

FROM node:alpine

RUN mkdir -p /wrap/app
RUN apk add --no-cache libc6-compat

WORKDIR /wrap
COPY package.json yarn.lock ./

RUN yarn

WORKDIR /wrap/app

ENV NODE_ENV production
ENV PORT 3000
EXPOSE 3000

CMD [ "../node_modules/.bin/next", "start" ]