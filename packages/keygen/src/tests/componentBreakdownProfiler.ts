import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import sodium from "libsodium-wrappers";
import { createClient } from "redis";
import { canonicalStringify, signMessage, verifySignature } from "../index";

/* ===================================================== */
/* CONFIG                                                */
/* ===================================================== */

const RUNS = 5;
const ITERATIONS = 5000;
const WARMUP = 500;

const prisma = new PrismaClient();

const redis = createClient({
    url: process.env.REDIS_URL,
});

/* ===================================================== */
/* TYPES                                                 */
/* ===================================================== */

type RunResult = {
    json: number[];
    crypto: number[];
    redis: number[];
    db: number[];
    otp: number[];
    write: number[];
    net: number[];
};

const results: RunResult[] = [];

/* ===================================================== */
/* TIMER HELPERS                                         */
/* ===================================================== */

const now = () => process.hrtime.bigint();
const diffUs = (s: bigint) => Number(process.hrtime.bigint() - s) / 1_000;

function _percentile(arr: number[], p: number) {
    const sorted = [
        ...arr,
    ].sort((a, b) => a - b);
    const idx = Math.floor((p / 100) * sorted.length);
    return sorted[Math.min(idx, sorted.length - 1)];
}

function printStats(_label: string, arr: number[]) {
    const _avg = arr.reduce((a, b) => a + b, 0) / arr.length;
}

function mergeRuns(key: keyof RunResult) {
    return results
        .slice(1) // discard warmup run
        .flatMap((r) => r[key]);
}

/* ===================================================== */
/* PROFILER                                              */
/* ===================================================== */

async function runProfile(_run: number) {
    const data: RunResult = {
        crypto: [],
        db: [],
        json: [],
        net: [],
        otp: [],
        redis: [],
        write: [],
    };

    const { publicKey, privateKey } = sodium.crypto_sign_keypair();

    const payload = {
        eventId: "bench-event",
        expiresAt: new Date(Date.now() + 600000).toISOString(),
        ticketId: "bench-ticket",
    };

    const message = canonicalStringify(payload);
    const signature = await signMessage(message, sodium.to_base64(privateKey));

    await redis.set("ticket:bench-ticket", "VALID");

    /* warmup */
    for (let i = 0; i < WARMUP; i++) {
        await redis.get("ticket:bench-ticket");
        await prisma.$queryRaw`SELECT 1`;
    }

    /* main loop */
    for (let i = 0; i < ITERATIONS; i++) {
        let t = now();
        const s = canonicalStringify(payload);
        JSON.parse(s);
        data.json.push(diffUs(t));

        t = now();
        await verifySignature(message, signature, sodium.to_base64(publicKey));
        data.crypto.push(diffUs(t));

        t = now();
        await redis.get("ticket:bench-ticket");
        data.redis.push(diffUs(t));

        t = now();
        await prisma.$queryRaw`SELECT 1`;
        data.db.push(diffUs(t));

        t = now();
        await prisma.$queryRaw`SELECT 1`;
        data.otp.push(diffUs(t));

        t = now();
        await prisma.$transaction([
            prisma.$executeRaw`SELECT 1`,
        ]);
        data.write.push(diffUs(t));

        t = now();
        await new Promise((r) => setImmediate(r));
        data.net.push(diffUs(t));
    }

    printStats("JSON serialize", data.json);
    printStats("Ed25519 verify", data.crypto);
    printStats("Redis GET", data.redis);
    printStats("PostgreSQL SELECT", data.db);
    printStats("OTP SELECT", data.otp);
    printStats("DB write (txn)", data.write);
    printStats("Network RTT", data.net);

    results.push(data);
}

/* ===================================================== */
/* MAIN                                                  */
/* ===================================================== */

(async () => {
    await sodium.ready;
    await redis.connect();

    for (let r = 1; r <= RUNS; r++) {
        await runProfile(r);
    }

    printStats("JSON serialize", mergeRuns("json"));
    printStats("Ed25519 verify", mergeRuns("crypto"));
    printStats("Redis GET", mergeRuns("redis"));
    printStats("PostgreSQL SELECT", mergeRuns("db"));
    printStats("OTP SELECT", mergeRuns("otp"));
    printStats("DB write (txn)", mergeRuns("write"));
    printStats("Network RTT", mergeRuns("net"));

    await prisma.$disconnect();
    await redis.disconnect();
})();
