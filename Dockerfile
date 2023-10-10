FROM node:18-alpine

RUN apk add --no-cache yarn

WORKDIR /src

COPY package.json .

RUN yarn install

COPY . .

RUN yarn run build

EXPOSE 3000

CMD ["yarn", "start"]