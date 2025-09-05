import z from "zod";

const emailSchema = z.email("Please enter a valid email address").nonempty("Email is required");

export const SignupType = z.object({
    email: emailSchema,
    firstName: z
        .string()
        .min(3, "First name must be at least 3 characters long")
        .max(20, "First name cannot exceed 20 characters")
        .optional(),
    lastName: z
        .string()
        .min(3, "Last name must be at least 3 characters long")
        .max(20, "Last name cannot exceed 20 characters")
        .optional(),
    password: z
        .string()
        .nonempty("Password is required")
        .min(6, "Password must be at least 6 characters long"),
});

export const SigninType = z.object({
    email: emailSchema,
    password: z
        .string()
        .nonempty("Password is required")
        .min(6, "Password must be at least 6 characters long"),
});

export const SignupResponseSchema = z.object({
    message: z.string(),
    token: z.string(),
    user: z
        .object({
            email: z.string().email(),
            firstName: z.string(),
            id: z.string().uuid(),
            lastName: z.string(),
        })
        .optional(),
});

export type SignupResponse = z.infer<typeof SignupResponseSchema>;

export const VerificationType = z.object({
    otp: z.string(),
});

export const allowedStatuses = [
    "draft",
    "published",
    "cancelled",
] as const;

export const EventType = z.object({
    banner_url: z.string().url().optional(),
    description: z.string().min(5),
    location_name: z.string().min(3),
    location_url: z.string().url(),
    organiserId: z.string(),
    status: z.enum([
        "draft",
        "published",
        "cancelled",
    ] as const),
    title: z.string().min(3),
});

export const EventSlotType = z.object({
    capacity: z.number().positive(),
    end_time: z.string().datetime(),
    start_time: z.string().datetime(),
});

const BaseTransactionSchema = z.object({
    amount: z
        .string()
        .regex(/^\d{2,4}$/, "Amount must be 2 to 4 digits")
        .optional(),
    cardNumber: z
        .string()
        .regex(/^\d{4}-\d{4}-\d{4}-\d{4}$/, "Card number must be in the format 1234-5678-9012-1234")
        .optional(),
    token: z.string(),
    userId: z.string().optional(),
});

export const WithdrawSchema = BaseTransactionSchema;
export type WithdrawType = z.infer<typeof WithdrawSchema>;

export const DepositSchema = BaseTransactionSchema;
export type DepositType = z.infer<typeof DepositSchema>;

export type TransactionType = {
    id: string;
    amount: string;
    cardId: string;
    type: "WITHDRAWAL" | "DEPOSIT";
    userId: string;
    createdAt: Date;
};

export type WithdrawResponse = {
    message: string;
    transaction?: TransactionType;
};

export type DepositResponse = {
    message: string;
    transaction?: TransactionType;
};

export const InitiateSchema = z.object({
    amount: z.string().regex(/^\d{2,4}$/, "Amount must be 2 to 4 digits"),
    bankName: z.string().optional(),
    cardNumber: z
        .string()
        .regex(
            /^\d{4}-\d{4}-\d{4}-\d{4}$/,
            "Card number must be in the format 1234-5678-9012-1234",
        ),
    token: z.string(),
});

export type InitiateType = z.infer<typeof InitiateSchema>;
