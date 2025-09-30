import sodium from "libsodium-wrappers";
import {
    createSignedTicket,
    decryptPayload,
    encryptPayload,
    generateKeyPair,
    generateSecretKey,
    verifySignedTicket,
} from "../index.js";

(async () => {
    await sodium.ready;

    const { privateKey, publicKey } = await generateKeyPair();

    const ticketPayload = {
        email: "ronak@example.com",
        eventEndTime: new Date(Date.now() + 3600000).toISOString(),
        eventId: "123",
        eventLocation: "IND",
        eventSlotId: "slot-1",
        eventStartTime: new Date().toISOString(),
        eventTitle: "Web3 Summit",
        firstName: "Ronak",
        issuedAt: new Date().toISOString(),
        lastName: "Maheshwari",
        quantity: 1,
        ticketId: "t-abc-123",
        totalAmount: 100,
        transactionToken: "tx-12345",
    };

    const _generatedSecretKey = await generateSecretKey();

    const encrypt_payload = await encryptPayload({
        ...ticketPayload,
        expiresAt: new Date(Date.now() + 3600000).toISOString(),
    });

    const _decrypt_payload = await decryptPayload(
        encrypt_payload.cipherText,
        encrypt_payload.nonce,
    );

    const signed = await createSignedTicket(ticketPayload, privateKey);

    const _verified = await verifySignedTicket(signed, publicKey);

    // ----------------------------
    // FRAUD TEST 1: Tamper ciphertext bytes (safe byte flip)
    // ----------------------------
    try {
        const decoded = sodium.from_base64(signed.ciphertext);

        decoded[0] = decoded[0] ^ 0x01;
        const tamperedCiphertext = sodium.to_base64(decoded);

        const tamperedTicket = {
            ciphertext: tamperedCiphertext,
            nonce: signed.nonce,
        };

        const _tamperedResult = await verifySignedTicket(tamperedTicket, publicKey);
    } catch (_err) {}

    // ----------------------------
    // FRAUD TEST 2: Tamper plaintext payload but keep original signature (re-encrypt)
    // ----------------------------
    try {
        const originalPlain = await decryptPayload(signed.ciphertext, signed.nonce);

        const tamperedPlain = {
            ...originalPlain,
            email: "attacker@example.com",
        };

        const tamperedWithSignature = {
            ...tamperedPlain,
            signature: originalPlain.signature,
        };

        const reEncrypted = await encryptPayload(tamperedWithSignature);

        const _tamperedPayloadResult = await verifySignedTicket(
            {
                ciphertext: reEncrypted.cipherText,
                nonce: reEncrypted.nonce,
            },
            publicKey,
        );
    } catch (_err) {}

    // ----------------------------
    // FRAUD TEST 3: Verify with different public key (invalid signer)
    // ----------------------------
    try {
        const { publicKey: fakePublicKey } = await generateKeyPair();
        const _invalidSignatureResult = await verifySignedTicket(signed, fakePublicKey);
    } catch (_err) {}
})();
