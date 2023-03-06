FROM node:alpine

WORKDIR '/app/frontend'

COPY package.json .

RUN npm install
RUN npm install -g expo-cli
COPY . .

CMD [ "npm","start" ]