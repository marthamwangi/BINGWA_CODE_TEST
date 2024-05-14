ARG NODE_VERSION=18.17.0

FROM node:${NODE_VERSION}-alpine AS builder

ENV APP_HOME=/app

WORKDIR $APP_HOME

COPY ["package*.json", "nx.json", "./"]

RUN npm install --legacy-peer-deps

COPY . .

RUN ls
RUN pwd

RUN npm install -g @angular/cli@17
RUN npm add --global nx@latest
EXPOSE 4200 3000 
CMD  ["npm","run","start"]