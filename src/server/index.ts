import express from "express";
import { Express } from "express";
import { webhookCallback } from "grammy";

import telegramBot from "../bot";

class Server {
  server: Express = express();
  private host = process.env.SERVER_HOST;
  private port = process.env.SERVER_PORT;

  constructor() {
    return;
  }

  private initMiddlewares() {
    this.server.use(express.json());
    this.server.use(webhookCallback(telegramBot, "express"));
  }

  init() {
    this.initMiddlewares();
    this.server.listen(this.port, () => {
      console.log(`Server is running at ${this.host}:${this.port}`);
    });
  }

}
export default Server;