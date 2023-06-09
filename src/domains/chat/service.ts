import { Chat } from "./entities";
import { AppDataSource } from "../../database/typeorm";
import { dateNowToTimestamp } from "../../utils/datetime";

class ChatService {
  repository = AppDataSource.getRepository(Chat);

  async create(userId: number) {
    const chat = new Chat();
    chat.userId = userId;
    chat.createdAt = dateNowToTimestamp();

    return await this.repository.save(chat);
  }

  async get(userId: number) {
    return this.repository.findOneBy({ userId });
  }

  async getOrCreate(userId: number) {
    let chat = await this.get(userId);
    if (chat === null) {
      chat = await this.create(userId);
    }
    return chat;
  }

}

export default ChatService;