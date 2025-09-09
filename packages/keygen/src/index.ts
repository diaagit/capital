import sodium from "libsodium-wrappers";

/**
 * Helper: Canonical JSON stringify (keys sorted)
 */
function canonicalStringify(obj: Record<string, any>): string {
    if (obj === null || typeof obj !== "object") {
        return JSON.stringify(obj);
    }

    if (Array.isArray(obj)) {
        return `[${obj.map(canonicalStringify).join(",")}]`;
    }

    const keys = Object.keys(obj).sort();
    return `{${keys.map((key) => `"${key}":${canonicalStringify(obj[key])}`).join(",")}}`;
}

/**
 * Generate Ed25519 key pair for signing
 */
export async function generateKeyPair() {
    await sodium.ready;
    const keypair = sodium.crypto_sign_keypair(); // Ed25519
    return {
        privateKey: sodium.to_base64(keypair.privateKey),
        publicKey: sodium.to_base64(keypair.publicKey),
    };
}

/**
 * Sign a message (ticketId:eventId:timestamp)
 */
export async function signMessage(message: string, privateKeyBase64: string) {
    await sodium.ready;
    const privateKey = sodium.from_base64(privateKeyBase64);
    const signature = sodium.crypto_sign_detached(message, privateKey);
    return sodium.to_base64(signature);
}

/**
 * Verify signature
 */
export async function verifySignature(
    message: string,
    signatureBase64: string,
    publicKeyBase64: string,
) {
    await sodium.ready;
    const signature = sodium.from_base64(signatureBase64);
    const publicKey = sodium.from_base64(publicKeyBase64);
    return sodium.crypto_sign_verify_detached(signature, message, publicKey);
}

/**
 * Create signed ticket payload for QR
 */
export async function createSignedTicket(
    ticketPayload: {
        eventId: string;
        eventLocation: string;
        eventSlotId: string;
        eventStartTime: string;
        eventEndTime: string;
        eventTitle: string;
        firstName: string;
        lastName: string;
        email: string;
        issuedAt: string;
        quantity: number;
        ticketId: string;
        totalAmount: number;
        transactionToken: string;
    },
    privateKeyBase64: string,
) {
    const issuedAt = new Date().toISOString();
    const expiresAt = new Date(
        new Date(ticketPayload.eventEndTime).getTime() + 30 * 60_000,
    ).toISOString();
    const payloadWithTimestamps = {
        ...ticketPayload,
        expiresAt,
        issuedAt,
    };
    const message = canonicalStringify(payloadWithTimestamps);
    const signature = await signMessage(message, privateKeyBase64);

    return {
        signature,
        ticketPayload: payloadWithTimestamps,
    };
}

/**
 * Verify signed ticket payload for QR
 */
export async function verifySignedTicket(
    data: {
        ticketPayload: Record<string, any>;
        signature: string;
    },
    publicKeyBase64: string,
) {
    const message = canonicalStringify(data.ticketPayload);
    const isValidSignature = await verifySignature(message, data.signature, publicKeyBase64);

    if (!isValidSignature)
        return {
            reason: "Invalid signature",
            valid: false,
        };

    const now = new Date();
    const expiresAt = new Date(data.ticketPayload.expiresAt);
    if (now > expiresAt) {
        return {
            reason: "Ticket expired",
            valid: false,
        };
    }

    return {
        valid: true,
    };
}
