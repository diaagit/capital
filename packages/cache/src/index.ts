import { createClient } from "redis";

const redisCache = createClient({
    url: process.env.REDIS_URL || "redis://localhost:6379",
});

redisCache.on("error", (_err) => {});

export async function initRedis() {
    try {
        if (!redisCache.isOpen) {
            await redisCache.connect();
        }
    } catch (_error) {}
}

export default redisCache;
