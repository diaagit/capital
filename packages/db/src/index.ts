import {
    BankName,
    EventStatus,
    OTPPurpose,
    type Prisma,
    PrismaClient,
    Role,
    TransactionType,
} from "@prisma/client";

const db = new PrismaClient();

export default db;

// Export types and enums for other packages
export type { Prisma };
export { BankName, Role, OTPPurpose, EventStatus, TransactionType };
