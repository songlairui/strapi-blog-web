# docker build -t next_base .

FROM node:alpine

RUN mkdir -p /opt/app
RUN apk add --no-cache libc6-compat

WORKDIR /opt/app
COPY package.json yarn.lock ./

RUN yarn

ENV NODE_ENV production
ENV PORT 3000
EXPOSE 3000

CMD [ "yarn", "start" ]