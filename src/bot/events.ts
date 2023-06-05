import TelegramBot from ".";
import openai from "../openai";
import nyanna from "../openai/personalities/nyanna";
import PersonalityPrompt from "../openai/personalityPrompt";

const personalityPrompt = new PersonalityPrompt(nyanna).getPersonalityPrompt();

export function initTelegramBot(telegramBot: TelegramBot) {
  telegramBot.bot.command("start",
    async (ctx) => {
      const gpt_response = await openai.createChatCompletion({
        model: process.env.OPENAI_API_MODEL || "gpt-3.5-turbo",
        messages: [
          ...personalityPrompt,
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

  telegramBot.bot.on("message",
    async (ctx) => {
      if (ctx.message.text) {
        const gpt_response = await openai.createChatCompletion({
          model: process.env.OPENAI_API_MODEL || "gpt-3.5-turbo",
          messages: [
            ...personalityPrompt,
            {
              role: "user",
              content: ctx.message.text
            }
          ],
          temperature: 0,
        });

        const chat_gpt_answer = gpt_response.data.choices[0]?.message?.content || "Not available.";

        ctx.reply(chat_gpt_answer);
      }
    }
  );
}