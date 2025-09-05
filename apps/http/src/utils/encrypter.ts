import { AlphanumericOTP } from "@repo/notifications";
import dotenv from "dotenv";

dotenv.config();

const SECRET_SALT = process.env.SECRET_SALT;

if (!SECRET_SALT) {
    throw new Error("No Secret KEY was provided! ");
}

export function encrypt(text: string): string {
    const randomPrefix = AlphanumericOTP(10);
    const randomSuffix = AlphanumericOTP(8);
    const reverseText = text.split("").reverse().join("");
    const saltedText = `${SECRET_SALT}${reverseText}${SECRET_SALT}`;
    return `${randomPrefix}${saltedText}${randomSuffix}`;
}

export function decrypt(encryptedString: string): string {
    const coreString = encryptedString.slice(10, -8);
    const unsalted = coreString.replace(new RegExp(SECRET_SALT, "g"), "");
    const originalText = unsalted.split("").reverse().join("");
    return originalText;
}
