import { ChatCompletionRequestMessage } from "openai";

import TelegramBot from ".";
import ChatService from "../domains/chat/service";
import openai from "../openai";
import nyanna from "../openai/personalities/nyanna";
import PersonalityPrompt from "../openai/personalityPrompt";
import MessageService from "../domains/message/service";
import MessageCache from "../domains/message/cache";
import { ChatCompletionMessage } from "../domains/message/messages.types";
import logger from "../logger";

const personalityPrompt = new PersonalityPrompt(nyanna).getPersonalityPrompt();
export function initTelegramBot(telegramBot: TelegramBot) {
  telegramBot.bot.command("start",
    async (ctx) => {
      const messages: ChatCompletionRequestMessage[] = [
        ...personalityPrompt,
        {
          role: "system",
          content: "Introduce yourself, greet the user, and ask him how he is doing."
        }
      ];

      // Creates or get user
      const userId = ctx.from?.id;
      if (userId) {
        const chat = await ChatService.getOrCreate(userId);
        // Creates Messages history
        for (const message of messages) {
          await MessageService.create(
            message.role,
            message.content,
            chat.id
          );
        }
      }

      // Gets ChatGPT response
      const gpt_response = await openai.createChatCompletion(messages);
      const chat_gpt_answer = gpt_response.data.choices[0]?.message?.content || "Not available.";

      // Replies user
      ctx.reply(chat_gpt_answer);
    });

  telegramBot.bot.on("message",
    async (ctx) => {
      if (ctx.message.text) {
        const messageCache = new MessageCache();

        // Gets context data
        const userMessageContent = ctx.message.text;
        const userId = ctx.from.id;

        // Gets latest messages
        const chat = await ChatService.getOrCreate(userId);
       
        let latestChatMessages: ChatCompletionMessage[] = await messageCache.findLatest(chat.id);
        
        if (latestChatMessages.length < 1) {
          latestChatMessages= (await MessageService.getLatestMessages(chat.id))
            .map(message => ({
              role: message.role,
              content: message.message
            }))
            .reverse();
        }
        const userMessage: ChatCompletionRequestMessage = {
          role: "user",
          content: userMessageContent
        };

        // Sets message history
        const messages: ChatCompletionMessage[] = [
          ...personalityPrompt,
          ...latestChatMessages,
          userMessage
        ];

        // Gets ChatGPT response
        const gpt_response = await openai.createChatCompletion(messages);
        const chat_gpt_answer = gpt_response.data.choices[0]?.message?.content || "Not available.";

        // Create new messages list
        const newMessages: ChatCompletionRequestMessage[] = [
          userMessage,
          { role: "assistant", content: chat_gpt_answer }
        ];

        // Adds new messages to database
        for (const message of newMessages) {
          MessageService.create(
            message.role,
            message.content,
            chat.id
          );
        }

        // Caches Messages history
        messageCache.create(chat.id, newMessages);

        // Replies user
        ctx.reply(chat_gpt_answer);
      }
    }
  );
}
