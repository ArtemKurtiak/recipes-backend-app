FROM node:latest

WORKDIR /app

COPY package*.json .
RUN npm ci

COPY . .

EXPOSE 5000

VOLUME [ "/app/data" ]

CMD [ "node", "app.js" ]