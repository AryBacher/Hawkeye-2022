FROM node:16-alpine

WORKDIR /app

COPY ./package.json ./package-lock.json ./

COPY ./ ./server

RUN npm install

EXPOSE 4000

CMD ["npm", "start"]