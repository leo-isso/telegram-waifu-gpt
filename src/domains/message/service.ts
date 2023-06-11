import { ChatCompletionRequestMessageRoleEnum, ChatCompletionResponseMessageRoleEnum } from "openai";

import { Message } from "./entities";
import { AppDataSource } from "../../database/typeorm";
import { dateNowToTimestamp } from "../../utils/datetime";

class MessageService {
  static repository = AppDataSource.getRepository(Message);

  static async create(
    role: ChatCompletionResponseMessageRoleEnum | ChatCompletionRequestMessageRoleEnum,
    message: string,
    chatId: string
  ) {
    const chatMessage = new Message();
    chatMessage.role = role;
    chatMessage.message = message;
    chatMessage.chatId = chatId;
    chatMessage.createdAt = dateNowToTimestamp();

    return await MessageService.repository.save(chatMessage);
  }

  static async get(chatId: string) {
    return MessageService.repository.find({ where: { chatId } });
  }

  static async getLatestMessages(chatId: string, limit = 16) {
    return MessageService.repository.find({
      where: { chatId },
      order: { createdAt: "DESC" },
      take: limit
    });
  }
}

export default MessageService;
