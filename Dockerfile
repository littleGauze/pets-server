FROM node:10.15.3-alpine

ENV NODE_ENV=production
EXPOSE 7001

WORKDIR /app
COPY package.json yarn.lock ./

RUN yarn config set registry https://registry.npm.taobao.org \
  && yarn

COPY ./ ./

CMD ["npm", "start"]
