import sodium from "libsodium-wrappers";

function canonicalStringify(obj: Record<string, any>): string {
    if (obj === null || typeof obj !== "object") {
        return JSON.stringify(obj);
    }
    if (Array.isArray(obj)) {
        return `[${obj.map(canonicalStringify).join(",")}]`;
    }
    const keys = Object.keys(obj).sort();
    return `{${keys.map((k) => `"${k}":${canonicalStringify(obj[k])}`).join(",")}}`;
}

const ITERATIONS = 200_000;
const WARMUP = 5_000;

function _percentile(arr: number[], p: number) {
    const sorted = [
        ...arr,
    ].sort((a, b) => a - b);
    const idx = Math.floor((p / 100) * sorted.length);
    return sorted[Math.min(idx, sorted.length - 1)];
}

(async () => {
    await sodium.ready;

    const { publicKey, privateKey } = sodium.crypto_sign_keypair();

    const payload = {
        email: "john@example.com",
        eventEndTime: "2026-02-01T21:00:00Z",
        eventId: "EVT123",
        eventLocation: "Mumbai",
        eventSlotId: "SLOT9",
        eventStartTime: "2026-02-01T18:00:00Z",
        eventTitle: "Live Concert",
        expiresAt: new Date(Date.now() + 3600_000).toISOString(),
        firstName: "John",
        issuedAt: new Date().toISOString(),
        lastName: "Doe",
        quantity: 2,
        ticketId: "TICKET-ABC",
        totalAmount: 1999,
        transactionToken: "TXN123",
    };

    const message = canonicalStringify(payload);
    const messageBytes = sodium.from_string(message);

    for (let i = 0; i < WARMUP; i++) {
        const sig = sodium.crypto_sign_detached(messageBytes, privateKey);
        sodium.crypto_sign_verify_detached(sig, messageBytes, publicKey);
    }

    const signTimes: number[] = [];
    for (let i = 0; i < ITERATIONS; i++) {
        const t0 = process.hrtime.bigint();
        sodium.crypto_sign_detached(messageBytes, privateKey);
        const t1 = process.hrtime.bigint();
        signTimes.push(Number(t1 - t0) / 1_000);
    }

    const signature = sodium.crypto_sign_detached(messageBytes, privateKey);
    const verifyTimes: number[] = [];
    for (let i = 0; i < ITERATIONS; i++) {
        const t0 = process.hrtime.bigint();
        sodium.crypto_sign_verify_detached(signature, messageBytes, publicKey);
        const t1 = process.hrtime.bigint();
        verifyTimes.push(Number(t1 - t0) / 1_000);
    }

    const report = (_label: string, _data: number[]) => {};

    report("Ed25519 Sign (system payload)", signTimes);
    report("Ed25519 Verify (system payload)", verifyTimes);
})();
