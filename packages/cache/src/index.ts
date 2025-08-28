import { createClient } from "redis";

const redis = createClient();

redis.on("error", (_err) => {});

const startServer = async () => {
    try {
        await redis.connect();
    } catch (_error) {}
};

startServer();

export default redis;
