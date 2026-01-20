import dotenv from "dotenv";
import { Resend } from "resend";
import OTPEmailTemplate from "../templates/emailTemplate";
import ForgotPasswordOTPEmailTemplate from "../templates/forgetPasswordTemplate";

dotenv.config();

const apiKey = process.env.RESEND_API_KEY;
if (!apiKey) {
    throw new Error("Missing RESEND_API_KEY in environment");
}
const resend = new Resend(apiKey);
type reasonType = "forget-password" | "login";

export async function sendEmailOtp(
    email: string,
    otp: number | string,
    reason?: reasonType,
): Promise<void> {
    try {
        const isForgotPassword = reason === "forget-password";
        const html = isForgotPassword
            ? ForgotPasswordOTPEmailTemplate(email, otp)
            : OTPEmailTemplate(email, otp);
        const subject = isForgotPassword ? "Reset Your Password – OTP Code" : "Your OTP Code";
        await resend.emails.send({
            from: "onboarding@hire.10xdevs.me",
            html,
            subject,
            to: email,
        });
    } catch (_error) {
        throw new Error("Couldn't send an email");
    }
}
