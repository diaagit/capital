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
