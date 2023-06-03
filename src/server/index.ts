import express from "express";
import { Express } from "express";
import { webhookCallback } from "grammy";

import TelegramBot from "../bot";

class Server {
  server: Express = express();
  telegramBot: TelegramBot;
  private host = process.env.SERVER_HOST;
  private port = process.env.SERVER_PORT;

  constructor(telegramBot: TelegramBot) {
    this.telegramBot = telegramBot;
  }

  private initMiddlewares() {
    this.server.use(express.json());
    this.server.use(webhookCallback(this.telegramBot.bot, "express", "return", 50000));
  }

  init() {
    this.initMiddlewares();
    this.server.listen(this.port, () => {
      console.log(`Server is running at ${this.host}:${this.port}`);
    });
  }

}
export default Server;