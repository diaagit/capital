import { AlphanumericOTP } from "@repo/notifications";

export function encrypt(text: string) {
    const randomBytes = AlphanumericOTP(10);
    const encrypted = randomBytes + text;
    return encrypted;
}

export function decrypt(encryptedString: string) {
    const removeBytes = encryptedString.slice(10);
    return removeBytes;
}

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
