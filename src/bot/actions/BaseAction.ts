import { Chat } from "../../domains/chat/entities";
import ChatService from "../../domains/chat/service";
import { ChatCompletionMessage } from "../../domains/message/messages.types";
import MessageService from "../../domains/message/service";
import PromptComposer from "../../openai/prompts/PromptComposer";
import openai from "../../openai";

class BaseAction {
  userId: number;

  constructor(userId: number) {
    this.userId = userId;
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

  composeMessages(newPrompts: ChatCompletionMessage[]): ChatCompletionMessage[] {
    const promptComposer = new PromptComposer(newPrompts);
    return promptComposer.compose();
  }

  async getAIResponse(prompts: ChatCompletionMessage[]): Promise<ChatCompletionMessage | null> {
    const gpt_response = await openai.createChatCompletion(prompts);
    return gpt_response.data.choices[0]?.message || null;
  }
}

export default BaseAction;
