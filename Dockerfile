FROM node:lts

WORKDIR app

COPY package.json .
RUN npm install
COPY . .
