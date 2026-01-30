import sodium from "libsodium-wrappers";

const ITERATIONS = 1_000_000;
const WARMUP = 10_000;
const MESSAGE_SIZE = 512; // bytes

function _percentile(arr: number[], p: number) {
    const sorted = [
        ...arr,
    ].sort((a, b) => a - b);
    const idx = Math.floor((p / 100) * sorted.length);
    return sorted[Math.min(idx, sorted.length - 1)];
}

async function main() {
    await sodium.ready;
    const { publicKey, privateKey } = sodium.crypto_sign_keypair();
    const message = sodium.randombytes_buf(MESSAGE_SIZE);
    for (let i = 0; i < WARMUP; i++) {
        const sig = sodium.crypto_sign_detached(message, privateKey);
        sodium.crypto_sign_verify_detached(sig, message, publicKey);
    }
    const signTimes: number[] = [];

    for (let i = 0; i < ITERATIONS; i++) {
        const start = process.hrtime.bigint();
        sodium.crypto_sign_detached(message, privateKey);
        const end = process.hrtime.bigint();
        signTimes.push(Number(end - start) / 1_000);
    }
    const signature = sodium.crypto_sign_detached(message, privateKey);
    const verifyTimes: number[] = [];

    for (let i = 0; i < ITERATIONS; i++) {
        const start = process.hrtime.bigint();
        sodium.crypto_sign_verify_detached(signature, message, publicKey);
        const end = process.hrtime.bigint();
        verifyTimes.push(Number(end - start) / 1_000);
    }

    function report(_label: string, data: number[]) {
        const _avg = data.reduce((a, b) => a + b, 0) / data.length;
    }

    report("Signature Generation", signTimes);
    report("Signature Verification", verifyTimes);
}

main().catch(console.error);
