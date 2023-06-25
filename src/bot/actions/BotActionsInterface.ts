import { Chat } from "../../domains/chat/entities";
import { ChatCompletionMessage } from "../../domains/message/messages.types";
import { Message } from "grammy/types";

export interface BotActionsInterface {
  userId: number,
  composeMessages(newPrompts: ChatCompletionMessage[]): ChatCompletionMessage[], 
  getOrCreateChat?(): Promise<Chat>,
  getAIResponse(prompts: ChatCompletionMessage[]): Promise<ChatCompletionMessage | null>,
  messageSender: (text: string) => Promise<Message.TextMessage>,
  saveMessages(chatId: string, prompts: ChatCompletionMessage[]): Promise<void>,
  sendMessage(): Promise<void>,
}
