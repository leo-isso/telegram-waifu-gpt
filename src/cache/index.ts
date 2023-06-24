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

  init() {
    this.redis.on("connect", () => {
      console.log("Connected to REDIS");
    });
    this.redis.connect();
  }
}

export default Redis;
