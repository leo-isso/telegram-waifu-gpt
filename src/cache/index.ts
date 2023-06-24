import { createClient } from "redis";

export type RedisClient = ReturnType<typeof createClient>

class Redis {
  redis: RedisClient = createClient({
    socket: {
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT || "6379")
    },
    password: process.env.REDIS_PASSWORD
  });

  async init() {
    this.redis.on("connect", () => {
      console.log("Connected to REDIS");
    });
    await this.redis.connect();
  }
}

export default Redis;
