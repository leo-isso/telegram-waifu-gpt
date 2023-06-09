import { ChatCompletionRequestMessage } from "openai";

import TelegramBot from ".";
import ChatService from "../domains/chat/service";
import openai from "../openai";
import nyanna from "../openai/personalities/nyanna";
import PersonalityPrompt from "../openai/personalityPrompt";
import MessageService from "../domains/message/service";
import { Message } from "../domains/message/entities";

const personalityPrompt = new PersonalityPrompt(nyanna).getPersonalityPrompt();
const chatService = new ChatService();
const messageService = new MessageService();

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
        const chat = await chatService.getOrCreate(userId);
        // Creates Messages history
        for (const message of messages) {
          messageService.create(
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
        // Gets context data
        const userMessageContent = ctx.message.text;
        const userId = ctx.from.id;


        // Gets latest messages
        const chat = await chatService.getOrCreate(userId);
        const latestChatMessages = (await messageService.getLatestMessages(chat.id))
          .map(message => ({
            role: message.role,
            content: message.message
          }));
        const userMessage: ChatCompletionRequestMessage = {
          role: "user",
          content: userMessageContent
        };

        // Sets message history
        const messages: ChatCompletionRequestMessage[] = [
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
          messageService.create(
            message.role,
            message.content,
            chat.id
          );
        }

        // Replies user
        ctx.reply(chat_gpt_answer);
      }
    }
  );
}