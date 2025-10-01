import redisCache from "@repo/cache";
import db, { type Prisma } from "@repo/db";
import { decryptPayload, verifySignedTicket } from "@repo/keygen";
import { AlphabeticOTP, NumericOTP } from "@repo/notifications";
import {
    ResetPasswordSchema,
    SigninType,
    type SignupResponse,
    SignupType,
    VerificationType,
} from "@repo/types";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import express, { type Request, type Response, type Router } from "express";
import jwt, { type SignOptions } from "jsonwebtoken";
import validatorMiddleware from "../middleware";

dotenv.config();
const validatorRouter: Router = express.Router();

const jwtSecret = process.env.JWT_SECRET as string;
const saltRounds = parseInt(process.env.SALT_ROUNDS || "10", 10);

if (!jwtSecret) {
    throw new Error("JWT_SECRET is not defined in environment variables");
}

const client = redisCache;
const Queue_name = "notification:initiate";

export interface SignupErrorResponse {
    message: string;
    errors?: unknown;
}

const generateToken = (id: string, expire?: string) =>
    jwt.sign(
        {
            userId: id,
        },
        jwtSecret,
        {
            expiresIn: (expire ?? "10m") as SignOptions["expiresIn"],
        },
    );

/**
 * Signup a User
 * @param {Express.Request} req - The HTTP request object containing user details.
 * @param {Express.Response} res - The HTTP response object used to return data.
 * @returns {Promise<void>} - Responds with a JSON object containing user info and JWT token.
 */
validatorRouter.post(
    "/signup",
    async (req: Request, res: Response<SignupResponse | SignupErrorResponse>) => {
        try {
            const parsed = SignupType.safeParse(req.body);
            if (!parsed.success) {
                return res.status(400).json({
                    errors: parsed.error.format(),
                    message: "Validation failed",
                });
            }

            const { firstName, lastName, email, password } = parsed.data;

            const existingUser = await db.user.findUnique({
                where: {
                    email,
                },
            });

            if (existingUser) {
                return res.status(400).json({
                    message: "Validator already registered",
                });
            }

            const hashedPassword = await bcrypt.hash(password, saltRounds);

            const newUser = await db.user.create({
                data: {
                    email,
                    first_name: firstName,
                    is_verified: false,
                    last_name: lastName,
                    password: hashedPassword,
                    role: "verifier",
                },
            });

            const otp = AlphabeticOTP(6);
            await db.otp.create({
                data: {
                    expires_at: new Date(Date.now() + 10 * 60 * 1000),
                    otp_code: otp,
                    purpose: "signup",
                    userId: newUser.id,
                },
            });

            await client.rPush(
                Queue_name,
                JSON.stringify({
                    email: newUser.email,
                    otp: otp,
                    type: "email",
                }),
            );

            // await sendEmailOtp(newUser.email, otp);

            const token = generateToken(newUser.id, "10m");
            await db.jwtToken.create({
                data: {
                    expires_at: new Date(Date.now() + 10 * 60 * 1000),
                    issued_at: new Date(),
                    token,
                    userId: newUser.id,
                },
            });

            return res.status(201).json({
                message: "Verifier successfully registered",
                token: token,
                user: {
                    email: newUser.email,
                    firstName: newUser.first_name,
                    id: newUser.id,
                    lastName: newUser.last_name,
                },
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Internal server error",
            });
        }
    },
);

/**
 * Signin a User
 * @param {Express.Request} req - The HTTP request object containing user details.
 * @param {Express.Response} res - The HTTP response object used to return data.
 * @returns {Promise<void>} - Responds with a JSON object containing user info and JWT token.
 */
validatorRouter.post(
    "/signin",
    async (req: Request, res: Response<SignupResponse | SignupErrorResponse>) => {
        try {
            const parsed = SigninType.safeParse(req.body);
            if (!parsed.success) {
                return res.status(400).json({
                    errors: parsed.error.format(),
                    message: "Validation failed",
                });
            }

            const { email, password } = parsed.data;

            const existingUser = await db.user.findUnique({
                where: {
                    email,
                },
            });
            if (!existingUser) {
                return res.status(400).json({
                    message: "Invalid email or password",
                });
            }

            const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

            if (!isPasswordCorrect) {
                return res.status(401).json({
                    message: "Invalid email or password",
                });
            }

            const token = generateToken(existingUser.id, "1d");
            await db.$transaction(async (tx: Prisma.TransactionClient) => {
                await tx.jwtToken.deleteMany({
                    where: {
                        userId: existingUser.id,
                    },
                });
                await tx.jwtToken.create({
                    data: {
                        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000),
                        issued_at: new Date(),
                        token,
                        userId: existingUser.id,
                    },
                });
            });

            return res.status(200).json({
                message: "Signin successful",
                token: token,
                user: {
                    email: existingUser.email,
                    firstName: existingUser.first_name,
                    id: existingUser.id,
                    lastName: existingUser.last_name,
                },
            });
        } catch (_error) {
            return res.status(500).json({
                message: "Internal server error",
            });
        }
    },
);

/**
 * Verify the User after signup
 * @param {Express.Request} req - The HTTP request object containing user details.
 * @param {Express.Response} res - The HTTP response object used to return data.
 * @returns {Promise<void>} - Responds with a JSON object containing user info and JWT token.
 */
validatorRouter.post("/verify", validatorMiddleware, async (req: Request, res: Response) => {
    try {
        const userId = req.userId;
        const parsed = VerificationType.safeParse(req.body);
        if (!userId || !parsed.success) {
            return res.status(400).json({
                message: "Invalid request",
            });
        }

        const { otp } = parsed.data;
        const otpRecord = await db.otp.findFirst({
            where: {
                expires_at: {
                    gt: new Date(),
                },
                is_used: false,
                otp_code: otp,
                userId,
            },
        });

        if (!otpRecord) {
            return res.status(400).json({
                message: "Invalid or expired OTP",
            });
        }

        await db.$transaction(async (tx: Prisma.TransactionClient) => {
            await tx.otp.update({
                data: {
                    is_used: true,
                },
                where: {
                    id: otpRecord.id,
                },
            });
            await tx.user.update({
                data: {
                    is_verified: true,
                },
                where: {
                    id: userId,
                },
            });
        });

        return res.status(200).json({
            message: "User verified successfully",
        });
    } catch (_err) {
        return res.status(500).json({
            message: "Internal server error",
        });
    }
});

/**
 * Logout the User after signup/signin
 * @param {Express.Request} req - The HTTP request object containing user details.
 * @param {Express.Response} res - The HTTP response object used to return data.
 * @returns {message: string} - Responds with a messaging.
 */
validatorRouter.post("/logout", validatorMiddleware, async (req: Request, res: Response) => {
    try {
        const userId = req.userId;
        await db.jwtToken.updateMany({
            data: {
                is_revoked: true,
            },
            where: {
                is_revoked: false,
                userId,
            },
        });
        return res.status(200).json({
            message: "Successfully logged out",
        });
    } catch (_error) {
        return res.status(500).json({
            message: "Internal server error",
        });
    }
});

/**
 * Resets the User after signup/signin
 * @param {Express.Request} req - The HTTP request object containing user details.
 * @param {Express.Response} res - The HTTP response object used to return data.
 * @returns {message: string} - Responds with a messaging.
 */
validatorRouter.post(
    "/reset-password",
    validatorMiddleware,
    async (
        req: Request,
        res: Response<
            | {
                  message: string;
              }
            | SignupErrorResponse
        >,
    ) => {
        try {
            const userId = req.userId;
            const parsedData = ResetPasswordSchema.safeParse(req.body);
            if (!parsedData.success) {
                return res.status(400).json({
                    message: "Invalid password was provided",
                });
            }
            const { password } = parsedData.data;
            const userExist = await db.user.findUnique({
                where: {
                    id: userId,
                },
            });
            if (!userExist) {
                return res.status(400).json({
                    message: "Provided email is invalid",
                });
            }
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            await db.user.update({
                data: {
                    password: hashedPassword,
                },
                where: {
                    id: userExist.id,
                },
            });
            return res.status(200).json({
                message: "Password was successfully updated",
            });
        } catch (_error) {
            return res.status(500).json({
                message: "Internal server error",
            });
        }
    },
);

/**
 * POST /validator/validate
 * Validates a ticket for an event and marks it as scanned by the validator.
 * @param {Express.Request} req - The HTTP request object containing ticketId in the body and validator's userId from the middleware.
 * @param {Express.Response} res - The HTTP response object used to return validation result.
 * @returns {success: boolean, ticket?: object, error?: string} - Returns updated ticket details if validation is successful, otherwise an error message.
 */
validatorRouter.post("/validate", validatorMiddleware, async (req: Request, res: Response) => {
    try {
        const _verifierId = req.userId;

        const { nonce, ciphertext } = req.body;

        if (!nonce || !ciphertext) {
            return res.status(400).json({
                message: "Missing nonce or ciphertext",
            });
        }

        const decryptedTicket = await decryptPayload(ciphertext, nonce);
        const ticketId = decryptedTicket.ticketId;

        const checkId = await db.ticket.findUnique({
            where: {
                id: ticketId,
            },
        });
        if (!checkId) {
            return res.status(400).json({
                message: "Invalid Ticket was provided",
            });
        }
        const publicKeyObj = await db.user.findUnique({
            where: {
                id: checkId.userId,
            },
        });
        if (!publicKeyObj || !publicKeyObj.public_key) {
            return res.status(400).json({
                message: "User public key not found",
            });
        }

        const validateTicket = await verifySignedTicket(
            {
                ciphertext,
                nonce,
            },
            publicKeyObj.public_key,
        );

        if (!validateTicket.valid) {
            return res.status(400).json({
                message: "Invalid ticket was submitted",
            });
        }

        const otp = NumericOTP(4).toString();
        const otpRecord = await db.otp.create({
            data: {
                expires_at: new Date(Date.now() + 5 * 60 * 1000),
                otp_code: otp,
                purpose: "ticket_validation",
                ticketId: checkId.id,
                userId: publicKeyObj.id,
            },
        });
        await client.rPush(
            Queue_name,
            JSON.stringify({
                email: publicKeyObj.email,
                otp: otpRecord.otp_code,
                type: "email",
            }),
        );
        // await sendEmailOtp(publicKeyObj.email, otpRecord.otp_code);
        return res.status(200).json({
            message: "OTP for person validation",
            ticketId: checkId.id,
        });
    } catch (err) {
        console.error("Validation error:", err);
        res.status(500).json({
            error: "Internal server error",
            success: false,
        });
    }
});

validatorRouter.post("/otp", validatorMiddleware, async (req: Request, res: Response) => {
    try {
        const verifierId = req.userId;
        const { otp_code, ticketId } = req.body;

        if (!otp_code || !ticketId) {
            return res.status(400).json({
                message: "OTP code and ticketId are required",
            });
        }

        const otpCheck = await db.otp.findFirst({
            where: {
                expires_at: {
                    gt: new Date(),
                },
                is_used: false,
                otp_code: otp_code.toString(),
                purpose: "ticket_validation",
                ticketId,
            },
        });

        if (!otpCheck) {
            return res.status(400).json({
                message: "Invalid or expired OTP",
            });
        }

        await db.$transaction(async (tx: Prisma.TransactionClient) => {
            await tx.otp.update({
                data: {
                    is_used: true,
                },
                where: {
                    id: otpCheck.id,
                },
            });

            await tx.ticketVerification.create({
                data: {
                    is_successful: true,
                    remarks: "OTP verified successfully",
                    ticketId: ticketId,
                    verification_time: new Date(),
                    verifierId: verifierId,
                },
            });

            await tx.ticket.update({
                data: {
                    is_valid: true,
                    is_verified: true,
                    scanned_at: new Date(),
                    scannedById: verifierId,
                },
                where: {
                    id: ticketId,
                },
            });
        });

        const ticket = await db.ticket.findUnique({
            where: {
                id: ticketId,
            },
        });
        if (ticket?.eventSlotId) {
            await redisCache.del(`pendingTickets:${ticket.eventSlotId}`);
            await redisCache.del(`validatedTickets:${ticket.eventSlotId}`);
        }

        return res.status(200).json({
            message: "Ticket successfully validated",
            success: true,
        });
    } catch (error) {
        console.error("OTP validation error:", error);
        return res.status(500).json({
            error: "Internal server error",
            success: false,
        });
    }
});

/**
 * LIST — Pending Tickets (not validated yet)
 */
validatorRouter.get(
    "/slots/:slotId/pending",
    validatorMiddleware,
    async (req: Request, res: Response) => {
        try {
            const { slotId } = req.params;
            const cacheKey = `pendingTickets:${slotId}`;

            const cached = await redisCache.get(cacheKey);
            if (cached) {
                return res.status(200).json({
                    source: "cache",
                    tickets: JSON.parse(cached.toString()),
                });
            }

            const tickets = await db.ticket.findMany({
                include: {
                    scanned_by: {
                        select: {
                            first_name: true,
                            id: true,
                            last_name: true,
                        },
                    },
                    user: {
                        select: {
                            email: true,
                            first_name: true,
                            id: true,
                            last_name: true,
                        },
                    },
                },
                where: {
                    eventSlotId: slotId,
                    is_valid: true,
                    is_verified: false,
                },
            });

            await redisCache.set(cacheKey, JSON.stringify(tickets), {
                EX: 60,
            });

            return res.status(200).json({
                source: "database",
                tickets,
            });
        } catch (err) {
            console.error("List pending tickets error:", err);
            return res.status(500).json({
                error: "Internal server error",
                success: false,
            });
        }
    },
);

/**
 * LIST — Validated Tickets
 */
validatorRouter.get(
    "/slots/:slotId/validated",
    validatorMiddleware,
    async (req: Request, res: Response) => {
        try {
            const { slotId } = req.params;
            const cacheKey = `validatedTickets:${slotId}`;

            const cached = await redisCache.get(cacheKey);
            if (cached) {
                return res.status(200).json({
                    source: "cache",
                    tickets: JSON.parse(cached.toString()),
                });
            }

            const tickets = await db.ticket.findMany({
                include: {
                    scanned_by: {
                        select: {
                            first_name: true,
                            id: true,
                            last_name: true,
                        },
                    },
                    user: {
                        select: {
                            email: true,
                            first_name: true,
                            id: true,
                            last_name: true,
                        },
                    },
                },
                where: {
                    eventSlotId: slotId,
                    is_valid: true,
                    is_verified: false,
                },
            });

            await redisCache.set(cacheKey, JSON.stringify(tickets), {
                EX: 60,
            });

            return res.status(200).json({
                source: "database",
                tickets,
            });
        } catch (err) {
            console.error("List validated tickets error:", err);
            return res.status(500).json({
                error: "Internal server error",
                success: false,
            });
        }
    },
);

/**
 * GET /validator/tickets/:ticketId
 * Retrieves detailed information for a specific ticket by its ID.
 * @param {Express.Request} req - The HTTP request object containing ticketId as a URL parameter.
 * @param {Express.Response} res - The HTTP response object used to return the ticket data.
 * @returns {success: boolean, ticket?: object, error?: string} - Returns ticket details if found, otherwise an error message.
 */
validatorRouter.get("/tickets/:ticketId", validatorMiddleware, async (req, res) => {
    try {
        const { ticketId } = req.params;
        const cacheKey = `ticket:${ticketId}`;
        const cached = await redisCache.get(cacheKey);
        if (cached) {
            return res.status(200).json({
                ticket: JSON.parse(cached.toString()),
            });
        }

        const ticket = await db.ticket.findFirst({
            include: {
                eventSlot: {
                    select: {
                        end_time: true,
                        event: {
                            select: {
                                location_name: true,
                                location_url: true,
                                status: true,
                                title: true,
                            },
                        },
                        price: true,
                        start_time: true,
                    },
                },
                user: {
                    select: {
                        email: true,
                        first_name: true,
                        id: true,
                        last_name: true,
                    },
                },
                verifications: {
                    select: {
                        is_successful: true,
                    },
                },
            },
            where: {
                id: ticketId,
            },
        });

        if (!ticket) {
            return res.status(404).json({
                error: "Invalid ticket Id was provided",
                success: false,
            });
        }
        await redisCache.set(cacheKey, JSON.stringify(ticket), {
            EX: 60,
        });
        return res.json({
            success: true,
            ticket: ticket,
        });
    } catch (err) {
        console.error("Get ticket error:", err);
        res.status(500).json({
            error: "Internal server error",
            success: false,
        });
    }
});

/**
 * GET /validator/slots/:slotId/validated
 * Lists all tickets for a specific event slot that have already been validated/scanned.
 * @param {Express.Request} req - The HTTP request object containing slotId as a URL parameter.
 * @param {Express.Response} res - The HTTP response object used to return a list of validated tickets.
 * @returns {success: boolean, tickets?: Array<object>, error?: string} - Returns an array of validated tickets, or an error message if none found or an error occurs.
 */
validatorRouter.get("/slots/:slotId", validatorMiddleware, async (req, res) => {
    try {
        const { slotId } = req.params;
        const cache = `tickets:${slotId}`;
        const cached = await redisCache.get(cache);
        if (cached) {
            return res.status(200).json({
                store: "cache",
                tickets: JSON.parse(cached.toString()),
            });
        }

        const tickets = await db.ticket.findMany({
            include: {
                scanned_by: {
                    select: {
                        first_name: true,
                        id: true,
                        last_name: true,
                    },
                },
                user: {
                    select: {
                        email: true,
                        first_name: true,
                        id: true,
                        last_name: true,
                    },
                },
            },
            where: {
                eventSlotId: slotId,
                is_verified: false,
            },
        });

        await redisCache.set(cache, JSON.stringify(tickets), {
            EX: 60,
        });

        return res.json({
            store: "Database",
            tickets: tickets,
        });
    } catch (err) {
        console.error("List validated tickets error:", err);
        res.status(500).json({
            error: "Internal server error",
            success: false,
        });
    }
});

validatorRouter.get(
    "/ticketcount/pending",
    validatorMiddleware,
    async (_req: Request, res: Response) => {
        try {
            const total_pending = await db.ticket.findMany({
                where: {
                    is_verified: false,
                },
            });
            return res.status(200).json({
                total: total_pending,
            });
        } catch (error) {
            console.error("List validated tickets error:", error);
            res.status(500).json({
                error: "Internal server error",
                success: false,
            });
        }
    },
);

validatorRouter.get(
    "/ticketcount/validated",
    validatorMiddleware,
    async (_req: Request, res: Response) => {
        try {
            const total_pending = await db.ticket.findMany({
                where: {
                    is_verified: true,
                },
            });
            return res.status(200).json({
                total: total_pending,
            });
        } catch (error) {
            console.error("List validated tickets error:", error);
            res.status(500).json({
                error: "Internal server error",
                success: false,
            });
        }
    },
);
export default validatorRouter;
