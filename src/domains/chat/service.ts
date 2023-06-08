import { Chat } from "./entities";
import logger from "../../logger";
import { AppDataSource } from "../../database/typeorm";
import { dateNowUnixTime } from "../../utils/datetime";

class ChatService {
  repository = AppDataSource.getRepository(Chat);

  async create(userId: number) {
    const chat = new Chat();
    chat.userId = userId;
    chat.createdAt = dateNowUnixTime();

    return await this.repository.save(chat);
  }

  async get(userId: number) {
    return this.repository.findOneBy({ userId });
  }

  async getOrCreate(userId: number) {
    try {
      let chat = await this.get(userId);
      if (chat === null) {
        chat = await this.create(userId);
      }
      return chat;
    } catch (error) {
      logger.error(error);
    }
  }

}

export default ChatService;