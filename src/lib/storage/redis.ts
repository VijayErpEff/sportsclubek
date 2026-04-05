import { Redis } from "@upstash/redis";

function createRedis(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

/** Singleton Redis client — null when env vars are missing. */
export const redis = createRedis();
