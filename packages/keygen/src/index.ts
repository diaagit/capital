import sodium from "libsodium-wrappers";

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
export async function createSignedTicketPayload(
    ticketId: string,
    eventId: string,
    privateKeyBase64: string,
) {
    const message = `${ticketId}:${eventId}:${Date.now()}`;
    const signature = await signMessage(message, privateKeyBase64);
    return {
        message,
        signature,
    };
}
