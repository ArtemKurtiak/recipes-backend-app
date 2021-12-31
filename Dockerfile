FROM node:latest

WORKDIR /app

COPY package*.json .
RUN npm ci

COPY . .

EXPOSE 5000

CMD [ "npm", "uninstall", "bcrypt" ]
CMD [ "npm", "install", "bcrypt" ]
CMD [ "npm", "start" ]