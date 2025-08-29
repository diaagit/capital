import { type Prisma, PrismaClient } from "@prisma/client";

const db = new PrismaClient();
export default db;

export type { Prisma };

export type { BankName, EventStatus, OTPPurpose, Role, TransactionType } from "@prisma/client";

export const BankNames = {
    bob: "bob",
    hdfc: "hdfc",
    icic: "icic",
    kotak: "kotak",
    yesbank: "yesbank",
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

export const TransactionTypes = {
    DEPOSIT: "DEPOSIT",
    PURCHASE: "PURCHASE",
    REFUND: "REFUND",
    WITHDRAWAL: "WITHDRAWAL",
} as const;
