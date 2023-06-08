import { ChatCompletionRequestMessage, ChatCompletionResponseMessageRoleEnum } from "openai";

import { Message } from "./entities";
import { AppDataSource } from "../../database/typeorm";

class MessageService {
  repository = AppDataSource.getRepository(Message);

  async create(
    role: ChatCompletionResponseMessageRoleEnum | ChatCompletionRequestMessage,
    message: string,
    chatId: string
  ) {
    const chatMessage = new Message();
    chatMessage.role = role;
    chatMessage.message = message;
    chatMessage.chatId = chatId;

    return await this.repository.save(chatMessage);
  }

  async get(chatId: string) {
    return this.repository.find({ where: { chatId } });
  }
}

export default MessageService;