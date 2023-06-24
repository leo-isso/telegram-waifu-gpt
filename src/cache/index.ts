import { createClient } from "redis";

export type RedisClient = ReturnType<typeof createClient>

const redis = createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT || "6379")
  },
  password: process.env.REDIS_PASSWORD
});

redis.on("connect", () => {
  console.log("Connected to Redis server");
});

redis.connect();

export default redis;
