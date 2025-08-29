import dotenv from "dotenv";
import { Resend } from "resend";
import OTPEmailTemplate from "../templates/emailTemplate";

dotenv.config();

const apiKey = process.env.RESEND_API_KEY;
if (!apiKey) {
    throw new Error("Missing RESEND_API_KEY in environment");
}
const resend = new Resend(apiKey);

export async function sendEmailOtp(email: string, otp: number | string): Promise<void> {
    try {
        const html = OTPEmailTemplate(email, otp);
        await resend.emails.send({
            from: "onboarding@hire.10xdevs.me",
            html,
            subject: "Your OTP Code",
            to: email,
        });
    } catch (_error) {
        throw new Error("Couldn't send an email");
    }
}
