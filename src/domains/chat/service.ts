import { AppDataSource } from "../../database/typeorm";
import { Chat } from "./entities";

class ChatService {
  repository = AppDataSource.getRepository(Chat);

  async create(userId: number) {
    const chat = new Chat();
    chat.userId = userId;
    await this.repository.save(chat);
  }

}

export default ChatService;