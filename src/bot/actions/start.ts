import { Chat } from "../../domains/chat/entities";
import ChatService from "../../domains/chat/service";
import { ChatCompletionMessage } from "../../domains/message/messages.types";
import MessageService from "../../domains/message/service";
import PromptComposer from "../../openai/prompts/PromptComposer";
import { IBotActions } from "./BotActionsInterface";
import openai from "../../openai";

const START_PROMPT: ChatCompletionMessage = {
  role: "system",
  content: "Introduce yourself, greet the user, and ask him how he is doing."
};

class StartAction implements IBotActions {
  userId: number;
  message: string | null = null;

  constructor(userId: number) {
    this.userId = userId;
  }

  private async saveMessages(chatId: string, prompts: ChatCompletionMessage[]): Promise<void> {
    for (const prompt of prompts) {
      await MessageService.create(
        prompt.role,
        prompt.content,
        chatId,
      );
    } 
  }

  private async getOrCreateChat(): Promise<Chat> {
    return await ChatService.getOrCreate(this.userId);
  }

  private composeMessages(newPrompts: ChatCompletionMessage[]): ChatCompletionMessage[] {
    const promptComposer = new PromptComposer(newPrompts);
    return promptComposer.compose();
  }

  private async getAIResponse(prompts: ChatCompletionMessage[]): Promise<ChatCompletionMessage | null> {
    const gpt_response = await openai.createChatCompletion(prompts);
    return gpt_response.data.choices[0]?.message || null;
  }

  async processMessage(): Promise<void> {
    const chat = await this.getOrCreateChat();
    const prompts = this.composeMessages([START_PROMPT]);
    const AIResponse = await this.getAIResponse(prompts);

    if (AIResponse) {
      this.message = AIResponse.content;
      const newMessages = [...prompts, AIResponse];
      await this.saveMessages(chat.id, newMessages);
    } else {
      this.message = "Sorry, an error occurred.";
    }
  }
}

export default StartAction;
