import { Bot } from "grammy";

import { initTelegramBot } from "./events";

class TelegramBot {
  private botKey = process.env.TELEGRAM_BOT_KEY;
  bot: Bot;

  constructor() {
    if (!this.botKey) {
      throw Error("Missing TELEGRAM_BOT_KEY");
    }
    this.bot = new Bot(this.botKey);
  }

  init() {
    initTelegramBot(this);
  }

}

export default TelegramBot;