import { AlphanumericOTP } from "@repo/notifications";

// ----------------- Simple Encrypt / Decrypt -----------------
export function encrypt(text: string): string {
    const randomBytes = AlphanumericOTP(10);
    return randomBytes + text;
}

export function decrypt(encryptedString: string): string {
    return encryptedString.slice(10);
}

// ----------------- Helper functions -----------------

// Convert string to byte array
function strToBytes(str: string): number[] {
    return Array.from(new TextEncoder().encode(str));
}

// Convert byte array to hex string
function bytesToHex(bytes: Uint8Array | number[]): string {
    return Array.from(bytes)
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
}

// Simple pseudo SHA256 digest using Web Crypto API
async function sha256(message: string): Promise<string> {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
    return bytesToHex(new Uint8Array(hashBuffer));
}

// ----------------- Signing / Verification -----------------

/**
 * Signs a message with a private key (pseudo signature)
 * @param message - string to sign
 * @param privateKey - string used as key
 * @returns base16 signature string
 */
export async function signMessage(message: string, privateKey: string): Promise<string> {
    const keyBytes = strToBytes(privateKey);
    const msgBytes = strToBytes(message);

    // Simple XOR with private key bytes
    const signatureBytes = msgBytes.map((b, i) => b ^ keyBytes[i % keyBytes.length]);

    // Hash the result to produce signature
    return await sha256(bytesToHex(signatureBytes));
}

/**
 * Verifies a message signature with a private key
 * @param message - original message
 * @param signature - signature to verify
 * @param privateKey - key used to sign
 * @returns boolean
 */
export async function verifySignature(
    message: string,
    signature: string,
    privateKey: string,
): Promise<boolean> {
    const expectedSignature = await signMessage(message, privateKey);
    return expectedSignature === signature;
}

// import { AlphanumericOTP } from "@repo/notifications";

// // ----------------- Simple Encrypt / Decrypt -----------------
// export function encrypt(text: string): string {
//   const randomBytes = AlphanumericOTP(10);
//   return randomBytes + text;
// }

// export function decrypt(encryptedString: string): string {
//   return encryptedString.slice(10);
// }

// import crypto from "node:crypto";

// const algorithm = "aes-256-cbc";
// const secret = crypto.randomBytes(32);
// const _iv = crypto.randomBytes(16);

// export function encrypt(text: string) {
//     const iv = crypto.randomBytes(16);
//     const cipher = crypto.createCipheriv(algorithm, secret, iv);
//     let encrypted = cipher.update(text, "utf8", "hex");
//     encrypted += cipher.final("hex");
//     return `${iv.toString("hex")}:${encrypted}`;
// }

// export function decrypt(encryptedString: string) {
//     const [ivHex, encryptedData] = encryptedString.split(":");
//     if (!ivHex || !encryptedData) {
//         throw new Error("Invalid encrypted string format");
//     }
//     const iv = Buffer.from(ivHex, "hex");
//     const decipher = crypto.createDecipheriv(algorithm, secret, iv);
//     let decrypted = decipher.update(encryptedData, "hex", "utf8");
//     decrypted += decipher.final("utf8");
//     return decrypted;
// }

// const { encryptedData, iv: ivHex } = encrypt("your-private-key");
// console.log("Encrypted:", encryptedData);

// const decrypted = decrypt(encryptedData, ivHex);
// console.log("Decrypted:", decrypted);
