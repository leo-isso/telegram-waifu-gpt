import { Chat } from "../../domains/chat/entities";
import MessageCache from "../../domains/message/cache";
import ChatService from "../../domains/chat/service";
import { ChatCompletionMessage } from "../../domains/message/messages.types";
import MessageService from "../../domains/message/service";
import PromptComposer from "../../openai/prompts/PromptComposer";
import openai from "../../openai";
import Personality from "../../openai/personality";

const PERSONALITY = new Personality("nyanna");

class BaseAction {
  userId: number;
  newMessage: string | null;
  messageCache = new MessageCache();

  constructor(userId: number, newMessage?: string) {
    this.userId = userId;
    this.newMessage = newMessage || null;
  }

  async cacheMessages(chatId: string, prompts: ChatCompletionMessage[]): Promise<void> {
    await this.messageCache.create(chatId, prompts);
  }

  async getLatestMessages(chatId: string): Promise<ChatCompletionMessage[]> {
    const cachedLatestMessages: ChatCompletionMessage[] = await this.messageCache.findLatest(chatId);

    if (cachedLatestMessages.length > 0) {
      return cachedLatestMessages;
    }

    return (await MessageService.getLatestMessages(chatId))
      .map(message => ({
        role: message.role,
        content: message.message
      }))
      .reverse();
  }

  async saveMessages(chatId: string, prompts: ChatCompletionMessage[]): Promise<void> {
    for (const prompt of prompts) {
      await MessageService.create(
        prompt.role,
        prompt.content,
        chatId,
      );
    }
  }

  async getOrCreateChat(): Promise<Chat> {
    return await ChatService.getOrCreate(this.userId);
  }

  getNewMessageAsCompletionMessage(): ChatCompletionMessage[] {
    if (!this.newMessage) {
      return [];
    }
    return [{
      role: "user",
      content: this.newMessage,
    }];
  }

  composeMessages(
    newPrompts: ChatCompletionMessage[],
    latestPrompts: ChatCompletionMessage[] = [],
    includePersonality = true,
  ): ChatCompletionMessage[] {
    const promptComposer = new PromptComposer(PERSONALITY, newPrompts, latestPrompts, includePersonality);
    return promptComposer.compose();
  }

  async getAIResponse(prompts: ChatCompletionMessage[]): Promise<ChatCompletionMessage | null> {
    const gpt_response = await openai.createChatCompletion(prompts);
    return gpt_response.data.choices[0]?.message || null;
  }
}

export default BaseAction;
