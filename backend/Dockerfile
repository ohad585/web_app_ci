FROM node:alpine

WORKDIR '/app/backend'

COPY package.json .

RUN npm install
COPY ./src .
COPY ./jenkins .
COPY ./jest.config.js .
COPY ./tsconfig.json .
COPY ./.env .

CMD [ "npm","run","test" ]