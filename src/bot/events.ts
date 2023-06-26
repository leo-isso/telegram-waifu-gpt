import TelegramBot from ".";
import StartAction from "./actions/start";
import OnMessageAction from "./actions/onMessage";

export function initTelegramBot(telegramBot: TelegramBot) {
  telegramBot.bot.command("start", async ctx => {
    const userId = ctx.from?.id;
    if(userId) {
      const startAction = new StartAction(userId);
      await startAction.processMessage();
      ctx.reply(startAction.getMessage() || "Something went wrong...");
    } else {
      ctx.reply("Sorry, could not find your userId");
    }
  });

  telegramBot.bot.on("message",
    async (ctx) => {
      if (ctx.message.text) {
        const newMessage = ctx.message.text;
        const userId = ctx.from.id;
        const startAction = new OnMessageAction(userId, newMessage);
        await startAction.processMessage();
        ctx.reply(startAction.getMessage() || "Something went wrong...");
      } else {
        ctx.reply("Sorry, could not get your message.");
      }
    }
  );
}
