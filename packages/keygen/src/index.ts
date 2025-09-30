import dotenv from "dotenv";
import sodium from "libsodium-wrappers";

dotenv.config();
const TICKET_KEY = process.env.TICKET_SECRET_KEY;

interface PayloadInterface {
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
    expiresAt: string;
    signature?: string;
}

type PayloadType =
    | PayloadInterface
    | (PayloadInterface & {
          signature: string;
      })
    | string;

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
    const signature = sodium.crypto_sign_detached(sodium.from_string(message), privateKey);
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
    return sodium.crypto_sign_verify_detached(signature, sodium.from_string(message), publicKey);
}

/**
 * Encrypt data using a shared secret key (Base64)
 */
export async function encryptPayload(ticketPayload: PayloadType) {
    await sodium.ready;
    const nonce = sodium.randombytes_buf(sodium.crypto_secretbox_NONCEBYTES);
    const key = sodium.from_base64(TICKET_KEY);
    const payloadString = JSON.stringify(ticketPayload);
    const payloadBytes = sodium.from_string(payloadString);
    const cipherText = sodium.crypto_secretbox_easy(payloadBytes, nonce, key);
    return {
        cipherText: sodium.to_base64(cipherText),
        nonce: sodium.to_base64(nonce),
    };
}

/**
 * Decrypt data using a shared secret key (Base64)
 */
export async function decryptPayload(ciphertextBase64: string, nonceBase64: string) {
    await sodium.ready;
    const cipherText = sodium.from_base64(ciphertextBase64);
    const nonce = sodium.from_base64(nonceBase64);
    const key = sodium.from_base64(TICKET_KEY);
    const decrypted = sodium.crypto_secretbox_open_easy(cipherText, nonce, key);
    if (!decrypted) {
        throw new Error("Failed to decrypt payload");
    }
    return JSON.parse(sodium.to_string(decrypted));
}

/**
 * Generate Secret Key for encryption signature
 */
export async function generateSecretKey() {
    await sodium.ready;
    return sodium.to_base64(sodium.randombytes_buf(sodium.crypto_secretbox_KEYBYTES));
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

    const encrypted = await encryptPayload({
        ...payloadWithTimestamps,
        signature,
    });

    return {
        ciphertext: encrypted.cipherText,
        nonce: encrypted.nonce,
    };
}

/**
 * Verify signed ticket payload for QR
 */
export async function verifySignedTicket(
    encryptedData: {
        nonce: string;
        ciphertext: string;
    },
    publicKeyBase64: string,
) {
    const decrypted = await decryptPayload(encryptedData.ciphertext, encryptedData.nonce);

    if (!decrypted) {
        return {
            reason: "Invalid Data",
            valid: false,
        };
    }

    const { signature, ...unsignedPayload } = decrypted;
    const message = canonicalStringify(unsignedPayload);

    const isValidSignature = await verifySignature(message, signature, publicKeyBase64);
    if (!isValidSignature) {
        return {
            reason: "Invalid signature",
            valid: false,
        };
    }

    const now = new Date();
    const expiresAt = new Date(decrypted.expiresAt);
    if (now > expiresAt) {
        return {
            reason: "Ticket expired",
            valid: false,
        };
    }

    return {
        payload: decrypted,
        valid: true,
    };
}
