import { Chat } from "./entities";
import { AppDataSource } from "../../data/typeorm";

class ChatService {
  static repository = AppDataSource.getRepository(Chat);

  static async create(userId: number) {
    const chat = new Chat();
    chat.userId = userId;
    chat.createdAt = new Date();

    return await ChatService.repository.save(chat);
  }

  static async get(userId: number) {
    return ChatService.repository.findOneBy({ userId });
  }

  static async getOrCreate(userId: number) {
    let chat = await ChatService.get(userId);
    if (chat === null) {
      chat = await ChatService.create(userId);
    }
    return chat;
  }

}

export default ChatService;
