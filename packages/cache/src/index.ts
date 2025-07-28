import { createClient } from "redis";

const redis = createClient();

redis.on('error',(err)=>{
    console.log('Redis Client Error', err);
})

const startServer = async () => {
    try {
        await redis.connect();
        console.log("Redis server is connected");
    } catch (error) {
        console.error("Failed to connect to Redis", error);
    }
};

startServer();

export default redis;