FROM node:18-alpine

WORKDIR /usr/app
COPY package*.json ./
RUN npm install
COPY . .
COPY ./entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 3000
ENTRYPOINT ["/entrypoint.sh"]
