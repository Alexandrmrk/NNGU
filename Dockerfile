FROM node:16.15.1-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --location=global npm@8.12.2
RUN npm install

COPY . .

CMD [ "npm", "run", "start"]
