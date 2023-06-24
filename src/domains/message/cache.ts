import { cache } from "../..";
import { RedisClient } from "../../cache";
import { ChatCompletionMessage } from "./messages.types";

class MessageCache {
  private redisClient: RedisClient = cache.redis;

  async create(chatId: string, data: ChatCompletionMessage[]): Promise<void> {
    const listKey = this._buildListKey(chatId);
    const listValues = this._buildListValues(data);
    
    listValues.forEach(message => {
      this.redisClient.rPush(listKey, message);
    });
  }

  async findLatest(chatId: string, count=10): Promise<ChatCompletionMessage[]> {
    const negativeCount = count === 0 ? 0 : (count * -1);
    const listKey = this._buildListKey(chatId);
    const messages = await this.redisClient.lRange(listKey, negativeCount, -1);
    return messages.map(message => JSON.parse(message));
  }

  private _buildListKey(chatId: string): string {
    return `messageId:${chatId}`;
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
