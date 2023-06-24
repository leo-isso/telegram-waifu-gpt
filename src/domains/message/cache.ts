import redis, { RedisClient } from "../../cache";
import { ChatCompletionMessage } from "./messages.types";

class MessageCache {
  private client: RedisClient;

  constructor() {
    this.client = redis;
  }

  async create(chatId: string, data: ChatCompletionMessage[]): Promise<void> {
    const listKey = this._buildListKey(chatId);
    const listValues = this._buildListValues(data);
    
    listValues.forEach(message => {
      this.client.rPush(listKey, message);
    });
  }

  async findOne(chatId: string, count=-10): Promise<ChatCompletionMessage[]> {
    const listKey = this._buildListKey(chatId);
    const messages = await this.client.lRange(listKey, count, -1);
    return messages.map(message => JSON.parse(message));
  }

  private _buildListKey(chatId: string): string {
    return `namespace:${chatId}`;
  }

  private _buildListValues(data: ChatCompletionMessage[]): string[] {
    const listValues: string[] = [];

    data.forEach(message => {
      listValues.push(JSON.stringify(message));
    });

    return listValues;
  }
}

export default MessageCache;
