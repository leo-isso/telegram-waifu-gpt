import TelegramBot from ".";
import openai from "../openai";
import { getPersonalityMessage } from "../openai/personality";

export function initTelegramBot(telegramBot: TelegramBot) {
  telegramBot.bot.command("start",
    async (ctx) => {
      const gpt_response = await openai.createChatCompletion({
        model: process.env.OPENAI_API_MODEL || "gpt-3.5-turbo",
        messages: [
          getPersonalityMessage(),
          {
            role: "system",
            content: "Introduce yourself, greet the user, and ask him how he is doing."
          }
        ],
        temperature: 0,
      });

      const chat_gpt_answer = gpt_response.data.choices[0]?.message?.content || "Not available.";

      ctx.reply(chat_gpt_answer);
    });
}