import { ChatCompletionRequestMessageRoleEnum, ChatCompletionResponseMessageRoleEnum } from "openai";

import { Message } from "./entities";
import { AppDataSource } from "../../database/typeorm";
import { dateNowToTimestamp } from "../../utils/datetime";

class MessageService {
  repository = AppDataSource.getRepository(Message);

  async create(
    role: ChatCompletionResponseMessageRoleEnum | ChatCompletionRequestMessageRoleEnum,
    message: string,
    chatId: string
  ) {
    const chatMessage = new Message();
    chatMessage.role = role;
    chatMessage.message = message;
    chatMessage.chatId = chatId;
    chatMessage.createdAt = dateNowToTimestamp();

    return await this.repository.save(chatMessage);
  }

  async get(chatId: string) {
    return this.repository.find({ where: { chatId } });
  }

  async getLatestMessages(chatId: string, limit = 16) {
    return this.repository.find({
      where: { chatId },
      order: { createdAt: "DESC" },
      take: limit
    });
  }
}

export default MessageService;