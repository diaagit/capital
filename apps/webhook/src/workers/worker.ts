import redisCache from "@repo/cache";

const _client = redisCache;
const Queue_name = "transactions:pending";
const Process_Queue = "transactions:processing";

async function _processJob() {
    try {
        while (true) {
            const job = await redisCache.brPopLPush(Queue_name, Process_Queue, 0);

            if (!job) {
                await new Promise((r) => setTimeout(r, 500));
                continue;
            }

            const jobValue = JSON.parse(typeof job === "string" ? job : job.toString());
            switch (jobValue.type) {
                case "DEPOSIT":
                    break;
                case "WITHDRAW":
                    break;
                case "REFUND":
                    break;
                case "PAYOUT":
                    break;
                default:
                    console.error("Unknown job type:", jobValue.type);
            }

            await redisCache.lRem(Process_Queue, 1, job);
        }
    } catch (error) {
        console.error("Worker loop error:", error);
        await new Promise((r) => setTimeout(r, 1000));
    }
}
