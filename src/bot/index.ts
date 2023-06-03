import { Bot } from "grammy";

const telegramBotKey = process.env.TELEGRAM_BOT_KEY;

if (!telegramBotKey) {
  throw Error("Missing TELEGRAM_BOT_KEY");
}

const telegramBot = new Bot(telegramBotKey);

export default telegramBot;