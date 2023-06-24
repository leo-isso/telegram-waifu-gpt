import { createClient } from "redis";

export type RedisClient = ReturnType<typeof createClient>

const redis = createClient({
  password: process.env.REDIS_PASSWORD
});

export default redis;
