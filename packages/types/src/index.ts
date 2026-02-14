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

export const OtpType = z.object({
    email: emailSchema,
});

export const ForgetType = z.object({
    email: emailSchema,
    newpassword: z
        .string({
            error: "Wrong Password format",
        })
        .nonempty("Password is required")
        .min(6, "Password must be at least 6 characters long"),
    otp: z.string().nonempty("OTP is Required").min(6, {
        error: "Invalid OTP format was provided",
    }),
});

export const ResetType = z.object({
    newpassword: z
        .string({
            error: "Wrong Password format",
        })
        .nonempty("Password is required")
        .min(6, "Password must be at least 6 characters long"),
    password: z
        .string({
            error: "Wrong Password format",
        })
        .nonempty("Password is required")
        .min(6, "Password must be at least 6 characters long"),
});

export const UserDetailsType = z.object({
    city: z
        .string({
            error: "Invalid City Name was provided",
        })
        // .min(3, {
        //     error: "City Name must atleast be 3 letters long",
        // })
        // .max(20, {
        //     error: "City Name must be less than 20 letters",
        // })
        .optional(),
    date: z.coerce
        .date({
            error: "Invalid date of birth was provided",
        })
        .optional(),
    firstName: z
        .string({
            error: "Invalid First Name was provided",
        })
        // .min(3, {
        //     error: "First Name must atleast be 3 letters long",
        // })
        // .max(24, {
        //     error: "First Name must be less than 24 letters",
        // })
        .optional(),
    lastName: z
        .string({
            error: "Invalid Last Name was provided",
        })
        // .min(3, {
        //     error: "Last Name must atleast be 3 letters long",
        // })
        // .max(24, {
        //     error: "Last Name must be less than 24 letters",
        // })
        .optional(),
    state: z
        .string({
            error: "Invalid State Name was provided",
        })
        // .min(3, {
        //     error: "State Name must atleast be 3 letters long",
        // })
        // .max(20, {
        //     error: "State Name must be less than 20 letters",
        // })
        .optional(),
    zipCode: z
        .string({
            error: "Invalid Zip-Code was provided",
        })
        // .min(6, {
        //     error: "Zip-Code must atleast be 6 letters long",
        // })
        // .max(10, {
        //     error: "Zip-Code must be less than 10 letters",
        // })
        .optional(),
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
    category: z.enum([
        "movie",
        "concert",
        "sports",
        "theatre",
        "comedy",
        "conference",
        "workshop",
        "exhibition",
        "festival",
        "other",
    ]),
    description: z.string().min(5),
    genre: z
        .enum([
            "action",
            "drama",
            "comedy",
            "romance",
            "horror",
            "thriller",
            "sci_fi",
            "fantasy",
            "documentary",
            "animation",
            "classical",
            "rock",
            "pop",
            "jazz",
            "hip_hop",
            "sports_general",
            "other",
        ])
        .optional(),
    hero_image_url: z.string().url().optional(),
    is_online: z.boolean().optional().default(false),
    language: z
        .enum([
            "english",
            "hindi",
            "marathi",
            "spanish",
            "french",
            "german",
            "japanese",
            "korean",
            "chinese",
            "tamil",
            "telugu",
            "multi_language",
        ])
        .optional(),
    organiserId: z.string().optional(),
    status: z.enum([
        "draft",
        "published",
        "cancelled",
    ] as const),
    title: z.string().min(3),
});

export const updateEventSchema = z
    .object({
        banner_url: z.string().url().optional(),
        category: z
            .enum([
                "movie",
                "concert",
                "sports",
                "theatre",
                "comedy",
                "conference",
                "workshop",
                "exhibition",
                "festival",
                "other",
            ])
            .optional(),
        description: z.string().min(10).optional(),
        genre: z
            .enum([
                "action",
                "drama",
                "comedy",
                "romance",
                "horror",
                "thriller",
                "sci_fi",
                "fantasy",
                "documentary",
                "animation",
                "classical",
                "rock",
                "pop",
                "jazz",
                "hip_hop",
                "sports_general",
                "other",
            ])
            .nullable()
            .optional(),
        hero_image_url: z.string().url().optional(),
        is_online: z.boolean().optional(),
        language: z
            .enum([
                "english",
                "hindi",
                "marathi",
                "spanish",
                "french",
                "german",
                "japanese",
                "korean",
                "chinese",
                "tamil",
                "telugu",
                "multi_language",
            ])
            .nullable()
            .optional(),
        status: z
            .enum([
                "draft",
                "published",
                "cancelled",
            ])
            .optional(),
        title: z.string().min(3).max(200).optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
        message: "At least one field must be provided for update",
    });

// export const EventSlotType = z.object({
//     capacity: z.number().positive(),
//     end_time: z.string().datetime(),
//     start_time: z.string().datetime(),
// });
export const EventSlotType = z
    .object({
        capacity: z.number().int().positive(),
        end_time: z.string(),
        event_date: z.string(),
        location_name: z.string().min(2),
        location_url: z.string().url(),
        price: z.number().nonnegative(),
        start_time: z.string(),
    })
    .refine((data) => new Date(data.end_time) > new Date(data.start_time), {
        message: "End time must be after start time",
        path: [
            "end_time",
        ],
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

export const TicketPurchaseSchema = z.object({
    cardNumber: z
        .string()
        .regex(
            /^\d{4}-\d{4}-\d{4}-\d{4}$/,
            "Card number must be in the format 1234-5678-9012-1234",
        ),
    eventSlotId: z.string(),
    quantity: z.number().positive().min(1).max(15),
    token: z.string(),
});
export type TicketPurchaseType = z.infer<typeof TicketPurchaseSchema>;

export const TicketPurchaseResponse = z.object({
    message: z.string(),
    ticketURL: z.url().optional(),
});

export type TicketPurchaseResponseType = z.infer<typeof TicketPurchaseResponse>;

export const ResetPasswordSchema = z.object({
    password: z.string(),
});

//New Schema (NO NEED TO MIGRATE to v4 OR WILL MAKE OUR LIFE BAD)

// // Email Schema
// const emailSchema = z.string()
//     .email({ message: "Please enter a valid email address" })
//     .min(1, { message: "Email is required" });

// // Signup Schema
// export const SignupType = z.object({
//     email: emailSchema,
//     firstName: z.string()
//         .min(3, { message: "First name must be at least 3 characters long" })
//         .max(20, { message: "First name cannot exceed 20 characters" })
//         .optional(),
//     lastName: z.string()
//         .min(3, { message: "Last name must be at least 3 characters long" })
//         .max(20, { message: "Last name cannot exceed 20 characters" })
//         .optional(),
//     password: z.string()
//         .min(6, { message: "Password must be at least 6 characters long" }),
// }).strict();

// export const SigninType = z.object({
//     email: emailSchema,
//     password: z.string()
//         .min(6, { message: "Password must be at least 6 characters long" }),
// }).strict();

// // Signup Response Schema
// export const SignupResponseSchema = z.object({
//     message: z.string(),
//     token: z.string(),
//     user: z.object({
//         email: z.string().email(),
//         firstName: z.string(),
//         id: z.string().uuid(),
//         lastName: z.string(),
//     }).optional(),
// }).strict();

// export type SignupResponse = z.infer<typeof SignupResponseSchema>;

// // Verification Schema
// export const VerificationType = z.object({
//     otp: z.string().min(1, { message: "OTP is required" }),
// }).strict();

// // Allowed Statuses
// export const allowedStatuses = ["draft", "published", "cancelled"] as const;

// // Event Schema
// export const EventType = z.object({
//     banner_url: z.string().url().optional(),
//     description: z.string().min(5),
//     location_name: z.string().min(3),
//     location_url: z.string().url(),
//     organiserId: z.string(),
//     status: z.enum(allowedStatuses),
//     title: z.string().min(3),
// }).strict();

// export const EventSlotType = z.object({
//     capacity: z.number().positive(),
//     end_time: z.string().datetime(),
//     start_time: z.string().datetime(),
// }).strict();

// // Base Transaction Schema
// const BaseTransactionSchema = z.object({
//     amount: z.string()
//         .regex(/^\d{2,4}$/, { message: "Amount must be 2 to 4 digits" })
//         .optional(),
//     cardNumber: z.string()
//         .regex(/^\d{4}-\d{4}-\d{4}-\d{4}$/, { message: "Card number must be in the format 1234-5678-9012-1234" })
//         .optional(),
//     token: z.string(),
//     userId: z.string().optional(),
// }).strict();

// export const WithdrawSchema = BaseTransactionSchema;
// export type WithdrawType = z.infer<typeof WithdrawSchema>;

// export const DepositSchema = BaseTransactionSchema;
// export type DepositType = z.infer<typeof DepositSchema>;

// export type TransactionType = {
//     id: string;
//     amount: string;
//     cardId: string;
//     type: "WITHDRAWAL" | "DEPOSIT";
//     userId: string;
//     createdAt: Date;
// };

// export type WithdrawResponse = {
//     message: string;
//     transaction?: TransactionType;
// };

// export type DepositResponse = {
//     message: string;
//     transaction?: TransactionType;
// };

// // Initiate Schema
// export const InitiateSchema = z.object({
//     amount: z.string().regex(/^\d{2,4}$/, { message: "Amount must be 2 to 4 digits" }),
//     bankName: z.string().optional(),
//     cardNumber: z.string()
//         .regex(/^\d{4}-\d{4}-\d{4}-\d{4}$/, { message: "Card number must be in the format 1234-5678-9012-1234" }),
//     token: z.string(),
// }).strict();

// export type InitiateType = z.infer<typeof InitiateSchema>;

// // Ticket Purchase Schema
// export const TicketPurchaseSchema = z.object({
//     token: z.string(),
//     eventSlotId: z.string().uuid("Invalid Event Slot ID"),
//     quantity: z.number().int().positive().min(1).max(15),
//     cardNumber: z.string()
//         .regex(/^\d{4}-\d{4}-\d{4}-\d{4}$/, { message: "Card number must be in the format 1234-5678-9012-1234" }),
// }).strict();

// export type TicketPurchaseType = z.infer<typeof TicketPurchaseSchema>;

// export const TicketPurchaseResponse = z.object({
//     message: z.string(),
//     ticketURL: z.string().url().optional(),
// }).strict();

// export type TicketPurchaseResponseType = z.infer<typeof TicketPurchaseResponse>;
