FROM node:lts

COPY package.json .
RUN npm install
COPY . .
