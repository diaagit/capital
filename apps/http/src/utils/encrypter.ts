import crypto from "node:crypto";

const algorithm = "aes-256-cbc";
const secret = process.env.ENCRYPTION_SECRET as string;

if (!secret) {
    throw new Error("ENCRYPTION_SECRET is not defined in env");
}

// Derive a fixed 32-byte key from secret
const key = crypto.createHash("sha256").update(secret).digest();

export function encrypt(text: string): string {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");
    return `${iv.toString("hex")}:${encrypted}`;
}

export function decrypt(encryptedString: string): string {
    const [ivHex, encryptedData] = encryptedString.split(":");
    if (!ivHex || !encryptedData) {
        throw new Error("Invalid encrypted string format");
    }
    const iv = Buffer.from(ivHex, "hex");
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encryptedData, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
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
