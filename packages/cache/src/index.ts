import { createClient } from "redis";

const redisCache = createClient();

redisCache.on("error", (_err) => {});

const startServer = async () => {
    try {
        await redisCache.connect();
    } catch (_error) {}
};

startServer();

export default redisCache;
