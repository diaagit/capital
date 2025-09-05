import { type Prisma, PrismaClient } from "@prisma/client";

const db = new PrismaClient();
export default db;

export type { Prisma };

export const BankNames = {
    bob: "bob",
    hdfc: "hdfc",
    icic: "icic",
    kotak: "kotak",
    yesbank: "yesbank",
} as const;

export const TransactionTypes = {
    CANCEL: "CANCEL",
    DEPOSIT: "DEPOSIT",
    PURCHASE: "PURCHASE",
    REFUND: "REFUND",
    WITHDRAWAL: "WITHDRAWAL",
} as const;

export const Roles = {
    admin: "admin",
    organiser: "organiser",
    user: "user",
    verifier: "verifier",
} as const;

export const OTPPurposes = {
    forgot_password: "forgot_password",
    signup: "signup",
} as const;

export const EventStatuses = {
    cancelled: "cancelled",
    draft: "draft",
    published: "published",
} as const;

// Types
export type BankName = (typeof BankNames)[keyof typeof BankNames];
export type TransactionType = (typeof TransactionTypes)[keyof typeof TransactionTypes];
export type Role = (typeof Roles)[keyof typeof Roles];
export type OTPPurpose = (typeof OTPPurposes)[keyof typeof OTPPurposes];
export type EventStatus = (typeof EventStatuses)[keyof typeof EventStatuses];
