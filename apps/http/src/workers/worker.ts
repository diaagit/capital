import redisCache, { initRedis } from "@repo/cache";
import { sendEmailOtp } from "@repo/notifications";

// type otpType = {
//     otp: string | number;
// };

type notificationType = "email" | "phone";
type reasonType = "forget-password" | "login";

interface jobInterface {
    type: notificationType;
    email?: string;
    phone?: string;
    otp: string | number;
    attempts?: number;
    reason?: reasonType;
}

// interface jobInterface {
//     type: "email" | "phone";
//     email?: string;
//     phone?: string;
//     otp: string;
//     attempts?: number;
// }

async function RedisStarter() {
    await initRedis();
}
RedisStarter();

const _client = redisCache;
const Queue_name = "notification:initiate";
const Process_Queue = "notification:processing";
const Failed_Queue = "notification:failed";
const MAX_ATTEMPTS = 3;

export async function processJob() {
    while (true) {
        const job = await _client.brPopLPush(Queue_name, Process_Queue, 0);
        if (!job) continue;

        let jobValue: jobInterface & {
            attempts?: number;
        };

        try {
            jobValue = JSON.parse(job.toString());
            jobValue.attempts = jobValue.attempts || 0;

            switch (jobValue.type) {
                case "email":
                    await processEmail(jobValue);
                    break;
                case "phone":
                    await processPhone(jobValue);
                    break;
                default:
                    throw new Error(`Unknown notification type: ${jobValue.type}`);
            }
            await _client.lRem(Process_Queue, 1, job);
        } catch (err) {
            console.error(`Notification job failed: ${(err as Error).message}`);

            if (jobValue) {
                jobValue.attempts = (jobValue.attempts || 0) + 1;

                if (jobValue.attempts < MAX_ATTEMPTS) {
                    const delay = 2 ** jobValue.attempts * 1000;
                    await new Promise((res) => setTimeout(res, delay));
                    await _client.lPush(Queue_name, JSON.stringify(jobValue));
                } else {
                    await _client.lPush(
                        Failed_Queue,
                        JSON.stringify({
                            ...jobValue,
                            error: (err as Error).message,
                            failedAt: new Date().toISOString(),
                        }),
                    );
                }
            }

            await _client.lRem(Process_Queue, 1, job);
        }
    }
}

export async function processEmail(job: jobInterface) {
    if (!job.email) throw new Error("Email not provided");
    await sendEmailOtp(job.email, job.otp, job.reason);
}

export async function processPhone(job: jobInterface) {
    if (!job.phone) throw new Error("Phone number not provided");
}

processJob();
