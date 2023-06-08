import { ChatCompletionRequestMessage } from "openai";

import TelegramBot from ".";
import ChatService from "../domains/chat/service";
import openai from "../openai";
import nyanna from "../openai/personalities/nyanna";
import PersonalityPrompt from "../openai/personalityPrompt";

const personalityPrompt = new PersonalityPrompt(nyanna).getPersonalityPrompt();
const chatService = new ChatService();

export function initTelegramBot(telegramBot: TelegramBot) {
  telegramBot.bot.command("start",
    async (ctx) => {
      // Gets ChatGPT response
      const messages: ChatCompletionRequestMessage[] = [
        ...personalityPrompt,
        {
          role: "system",
          content: "Introduce yourself, greet the user, and ask him how he is doing."
        }
      ];
      const gpt_response = await openai.createChatCompletion(messages);
      const chat_gpt_answer = gpt_response.data.choices[0]?.message?.content || "Not available.";

      // Replies user
      ctx.reply(chat_gpt_answer);

      // Creates or get user
      const userId = ctx.from?.id;
      if (userId) {
        chatService.getOrCreate(userId);
      }
    });

  telegramBot.bot.on("message",
    async (ctx) => {
      if (ctx.message.text) {
        const userMessage = ctx.message.text;
        const messages: ChatCompletionRequestMessage[] = [
          ...personalityPrompt,
          {
            role: "user",
            content: userMessage
          }
        ];
        const gpt_response = await openai.createChatCompletion(messages);
        const chat_gpt_answer = gpt_response.data.choices[0]?.message?.content || "Not available.";

        ctx.reply(chat_gpt_answer);
      }
    }
  );
}