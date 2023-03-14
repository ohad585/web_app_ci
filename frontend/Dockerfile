FROM node:alpine

WORKDIR '/app/frontend'

COPY package.json .
COPY app.json .

RUN npm install -g expo-cli
RUN npm install --global eas-cli
RUN npm install
COPY . .
#ARG EXPO_TOKEN="2cq5hQaJ1sh9zwGEZcl6EGXC99Upy4wqf5UmdQlV"
#RUN eas init --id f64c7dc3-db37-4141-8d7f-691b64a4b518
#ARG EAS_NO_VCS=1
#RUN eas build -p all

EXPOSE 19000
EXPOSE 19001
EXPOSE 19002
EXPOSE 19006

CMD [ "npm","run","web" ]
