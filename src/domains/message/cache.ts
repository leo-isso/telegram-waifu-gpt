import redis, { RedisClient } from "../../cache";
import { ChatCompletionMessage } from "./messages.types";

class MessageCache {
  private client: RedisClient;

  constructor() {
    this.client = redis;
  }

  async create(chatId: string, data: ChatCompletionMessage): Promise<void> {
    const hashKey = this._buildHashKey(chatId);
    const hashValues = this._buildHashValues(data);
    await this.client.hSet(hashKey, hashValues);
  }

  async findOne(chatId: string): Promise<object | null> {
    const hashKey = this._buildHashKey(chatId);
    return this.client.hGetAll(hashKey);
  }

  private _buildHashKey(chatId: string): string {
    return `namespace:${chatId}`;
  }

  private _buildHashValues(data: object): string[] {
    const hashValues: string[] = [];

    Object.entries(data).forEach(([key, value]) => {
      hashValues.push(key, JSON.stringify(value));
    });

    return hashValues;
  }
}

export default MessageCache;
