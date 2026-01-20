import redisCache, { initRedis } from "@repo/cache";
import { sendEmailOtp } from "@repo/notifications";

type notificationType = "email" | "phone";

interface jobInterface {
    type: notificationType;
    email?: string;
    phone?: string;
    otp: string | number;
    attempts?: number;
    reason?: string;
}

const Queue_name = "notification:initiate";
const Process_Queue = "notification:processing";
const Failed_Queue = "notification:failed";
const MAX_ATTEMPTS = 3;

async function startWorker() {
    await initRedis();

    while (true) {
        const job = await redisCache.brPopLPush(Queue_name, Process_Queue, 0);

        if (!job) continue;

        let payload: jobInterface;

        try {
            payload = JSON.parse(job.toString());

            if (payload.type === "email") {
                if (!payload.email) throw new Error("Email missing");
                await sendEmailOtp(payload.email, payload.otp);
            }

            await redisCache.lRem(Process_Queue, 1, job);
        } catch (err) {
            console.error("Job failed:", err);

            payload.attempts = (payload.attempts ?? 0) + 1;

            if (payload.attempts < MAX_ATTEMPTS) {
                await redisCache.lPush(Queue_name, JSON.stringify(payload));
            } else {
                await redisCache.lPush(
                    Failed_Queue,
                    JSON.stringify({
                        ...payload,
                        error: String(err),
                    }),
                );
            }

            await redisCache.lRem(Process_Queue, 1, job);
        }
    }
}

startWorker();
