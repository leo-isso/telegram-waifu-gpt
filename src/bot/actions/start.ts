import { ChatCompletionResponseMessage } from "openai";
import { Chat } from "../../domains/chat/entities";
import ChatService from "../../domains/chat/service";
import { ChatCompletionMessage } from "../../domains/message/messages.types";
import MessageService from "../../domains/message/service";
import PromptComposer from "../../openai/prompts/PromptComposer";
import { BotActionsInterface } from "./BotActionsInterface";
import openai from "../../openai";
import { Message } from "grammy/types";

const START_PROMPT: ChatCompletionMessage = {
  role: "system",
  content: "Introduce yourself, greet the user, and ask him how he is doing."
};

class StartAction implements BotActionsInterface {
  userId: number;
  messageSender: (text: string) => Promise<Message.TextMessage>;

  constructor(
    userId: number,
    messageSender: (text: string) => Promise<Message.TextMessage>
  ) {
    this.userId = userId;
    this.messageSender = messageSender;
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

  async sendMessage(): Promise<void> {
    const chat = await this.getOrCreateChat();
    const prompts = this.composeMessages([START_PROMPT]);
    const AIResponse = await this.getAIResponse(prompts);

    if (AIResponse) {
      await this.messageSender(AIResponse.content);
      const newMessages = [...prompts, AIResponse];
      await this.saveMessages(chat.id, newMessages);
    } else {
      await this.messageSender("Sorry, an error occurred.");
    }
  }
}

export default StartAction;
