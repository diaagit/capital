import { sendEmailOtp } from "./services/emailService";

export * from "./services/emailService";
export * from "./templates/emailTemplate";

sendEmailOtp("ronakmaheshwari077@gmail.com", "ABCDEF");
