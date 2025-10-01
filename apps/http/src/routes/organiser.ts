import redisCache from "@repo/cache";
import db, { type Prisma } from "@repo/db";
import { AlphanumericOTP } from "@repo/notifications";
import {
    allowedStatuses,
    InitiateSchema,
    SigninType,
    SignupType,
    VerificationType,
} from "@repo/types";
import bcrypt from "bcrypt";
import Decimal from "decimal.js";
import dotenv from "dotenv";
import express, { type Request, type Response, type Router } from "express";
import jwt, { type SignOptions } from "jsonwebtoken";
import { organiserMiddleware } from "../middleware";
import { createCardForOrganiser } from "../utils/bankCards";

dotenv.config();
const organiserRouter: Router = express.Router();

const jwtSecret = process.env.JWT_SECRET as string;
const saltRounds = parseInt(process.env.SALT_ROUNDS || "10", 10);
const _client = redisCache;
const Queue_name = "notification:initiate";

if (!jwtSecret) {
    throw new Error("JWT_SECRET is not defined in environment variables");
}

const generateToken = (id: string, expire?: string) =>
    jwt.sign(
        {
            organiserId: id,
        },
        jwtSecret,
        {
            expiresIn: (expire ?? "10m") as SignOptions["expiresIn"],
        },
    );

/**
 * Helper: Apply Filters from Query Params
 */
function _filterEvents(
    events: any[],
    filters: {
        status?: string;
        title?: string;
        location?: string;
    },
) {
    return events.filter((event) => {
        return (
            (!filters.status || event.status === filters.status) &&
            (!filters.title || event.title?.toLowerCase().includes(filters.title.toLowerCase())) &&
            (!filters.location ||
                event.location_name?.toLowerCase().includes(filters.location.toLowerCase()))
        );
    });
}

/**
 * @route POST /signup
 * @desc Organiser Signup
 */
organiserRouter.post("/signup", async (req: Request, res: Response) => {
    try {
        const parsedData = SignupType.safeParse(req.body);
        if (!parsedData.success) {
            return res.status(400).json({
                errors: parsedData.error.issues,
                message: "Invalid data was provided",
            });
        }

        const { firstName, lastName, email, password } = parsedData.data;
        const existingUser = await db.user.findUnique({
            where: {
                email,
            },
        });

        if (existingUser) {
            return res.status(400).json({
                message: `User with email ${email} already exists`,
            });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = await db.user.create({
            data: {
                email,
                first_name: firstName,
                last_name: lastName,
                password: hashedPassword,
                role: "organiser",
            },
        });

        const otp = AlphanumericOTP(6);
        await db.otp.create({
            data: {
                expires_at: new Date(Date.now() + 10 * 60 * 1000),
                otp_code: otp,
                purpose: "signup",
                userId: newUser.id,
            },
        });

        await _client.rPush(
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
            message: "User successfully registered",
            token,
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
            error: "Internal error occured",
        });
    }
});

/**
 * @route POST /signin
 * @desc Organiser Signin
 */
organiserRouter.post("/signin", async (req: Request, res: Response) => {
    try {
        const parsedData = SigninType.safeParse(req.body);
        if (!parsedData.success) {
            return res.status(400).json({
                errors: parsedData.error.issues,
                message: "Invalid data was provided",
            });
        }

        const { email, password } = parsedData.data;
        const existingUser = await db.user.findUnique({
            where: {
                email,
            },
        });

        if (!existingUser) {
            return res.status(400).json({
                message: `User with email ${email} doesn't exist`,
            });
        }

        const checkPassword = await bcrypt.compare(password, existingUser.password);
        if (!checkPassword) {
            return res.status(401).json({
                message: "Invalid password was provided",
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
            token,
            user: {
                email: existingUser.email,
                firstName: existingUser.first_name,
                id: existingUser.id,
                lastName: existingUser.last_name,
            },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Internal error occured",
            message: "Internal error occured",
        });
    }
});

/**
 * Verify the User after signup
 * @param {Express.Request} req - The HTTP request object containing user details.
 * @param {Express.Response} res - The HTTP response object used to return data.
 * @returns {Promise<void>} - Responds with a JSON object containing user info and JWT token.
 * @route POST /verify
 */
organiserRouter.post("/verify", organiserMiddleware, async (req: Request, res: Response) => {
    try {
        const organiserId = req.organiserId as string | undefined;
        const parsedData = VerificationType.safeParse(req.body);
        if (!parsedData.success || !organiserId) {
            return res.status(400).json({
                message: "Invalid userId or OTP format",
            });
        }

        const { otp } = parsedData.data;
        const checkOTP = await db.otp.findFirst({
            where: {
                expires_at: {
                    gt: new Date(),
                },
                is_used: false,
                otp_code: otp,
                userId: organiserId,
            },
        });

        if (!checkOTP) {
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
                    id: checkOTP.id,
                },
            });
            await createCardForOrganiser(checkOTP.userId);

            await tx.wallet.create({
                data: {
                    balance: 1000.0,
                    status: "active",
                    userId: checkOTP.userId,
                },
            });
        });

        return res.status(200).json({
            message: "OTP verified successfully",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Internal error occured",
            message: "Internal error occured",
        });
    }
});

/**
 * Initiate a payment from wallet to cardNumber
 * @route POST /initiate
 */
organiserRouter.post("/initiate", organiserMiddleware, async (req: Request, res: Response) => {
    try {
        const organiserId = req.organiserId as string;
        const parsedData = InitiateSchema.safeParse(req.body);
        if (!parsedData.success) {
            return res.status(400).json({
                errors: parsedData.error.flatten(),
                message: "Invalid data was provided",
            });
        }
        const { token, amount, cardNumber } = parsedData.data;
        const Amount = new Decimal(amount);

        if (Amount.lte(0)) {
            return res.status(400).json({
                message: "Amount must be greater than zero",
            });
        }

        await db.$transaction(async (tx: Prisma.TransactionClient) => {
            const checkCard = await tx.card.findUnique({
                where: {
                    card_number: cardNumber,
                    userId: organiserId,
                },
            });

            if (!checkCard) {
                throw new Error("Invalid card was provided");
            }

            const walletDetail = await tx.wallet.findUnique({
                where: {
                    userId: organiserId,
                },
            });

            if (!walletDetail) {
                throw new Error("Wallet not found");
            }

            if (walletDetail.balance < Amount) {
                throw new Error("Wallet balance is insufficient");
            }

            await tx.transaction.create({
                data: {
                    amount: Amount.toNumber(),
                    bank_name: checkCard.bank_name,
                    cardId: checkCard.id,
                    token,
                    type: "Initiate",
                    userId: checkCard.userId,
                },
            });
        });

        return res.status(200).json({
            message: "Payment initiation recorded successfully",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: error instanceof Error ? error.message : "Internal server error",
        });
    }
});

/**
 * @route GET /events
 * @desc Get all events (with optional filters)
 */
organiserRouter.get("/events", organiserMiddleware, async (req: Request, res: Response) => {
    try {
        const organiserId = req.organiserId as string | undefined;
        if (!organiserId) {
            return res.status(403).json({
                message: "Unauthenticated",
            });
        }

        const { status, title, location } = req.query;

        const events = await db.event.findMany({
            orderBy: {
                created_at: "desc",
            },
            where: {
                organiserId,
                ...(status && typeof status === "string" && allowedStatuses.includes(status as any)
                    ? {
                          status: status as any,
                      }
                    : {}),
                ...(title
                    ? {
                          title: {
                              contains: title as string,
                              mode: "insensitive",
                          },
                      }
                    : {}),
                ...(location
                    ? {
                          location_name: {
                              contains: location as string,
                              mode: "insensitive",
                          },
                      }
                    : {}),
            },
        });

        if (!events || events.length === 0) {
            return res.status(404).json({
                message: "No events found for the given filters",
            });
        }

        return res.status(200).json({
            data: events,
            message: "Events fetched",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: error instanceof Error ? error.message : "Internal error",
            message: "Internal error occured",
        });
    }
});

/**
 * @route GET /events/summary
 * @desc Event summary grouped by event: tickets sold, revenue, attendees
 */
organiserRouter.get("/events/summary", organiserMiddleware, async (req: Request, res: Response) => {
    try {
        const organiserId = req.organiserId as string | undefined;
        if (!organiserId)
            return res.status(403).json({
                message: "Unauthenticated",
            });

        const eventSummary = (await db.$queryRawUnsafe(`
  SELECT 
    e.id AS "eventId",
    e.title AS "eventName",
    COALESCE(SUM(t."ticket_count"), 0) AS "ticketsSold",
    COALESCE(SUM(t.amount), 0) AS "totalRevenue",
    COUNT(DISTINCT t."userId") AS "attendees"
  FROM "Transaction" t
  INNER JOIN "Ticket" tk ON t."ticketId" = tk.id
  INNER JOIN "EventSlot" es ON tk."eventSlotId" = es.id
  INNER JOIN "Event" e ON es."eventId" = e.id
  WHERE e."organiserId" = $1
    AND t.type = 'PURCHASE'
  GROUP BY e.id, e.title
  ORDER BY e.title ASC;
`)) as unknown as {
            eventId: string;
            eventName: string;
            ticketsSold: number;
            totalRevenue: number;
            attendees: number;
        }[];

        return res.status(200).json({
            data: eventSummary,
            message: "Event summaries fetched successfully",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: error instanceof Error ? error.message : error,
            message: "Internal error occurred",
        });
    }
});

/**
 * @route GET /events/analytics
 * @desc Analytics for organiser: total events, tickets sold, total revenue
 */
organiserRouter.get(
    "/events/analytics",
    organiserMiddleware,
    async (req: Request, res: Response) => {
        try {
            const organiserId = req.organiserId as string | undefined;
            if (!organiserId)
                return res.status(403).json({
                    message: "Unauthenticated",
                });

            const [totalEvents, totalTicketsSold, totalRevenueAgg] = await Promise.all([
                db.event.count({
                    where: {
                        organiserId,
                    },
                }),
                db.ticket.count({
                    where: {
                        eventSlot: {
                            event: {
                                organiserId,
                            },
                        },
                    },
                }),
                db.transaction.aggregate({
                    _sum: {
                        amount: true,
                    },
                    where: {
                        ticket: {
                            eventSlot: {
                                event: {
                                    organiserId,
                                },
                            },
                        },
                        type: "PURCHASE",
                    },
                }),
            ]);

            return res.status(200).json({
                data: {
                    totalEvents,
                    totalRevenue: (totalRevenueAgg._sum.amount as any) || 0,
                    totalTicketsSold,
                },
                message: "Analytics fetched successfully",
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                error: error instanceof Error ? error.message : error,
                message: "Internal error occurred",
            });
        }
    },
);

/**
 * @route GET /events/
 * @desc  performing events by revenue or tickets sold
 * @query limit (number) default 5
 * @query sortBy 'revenue' | 'tickets'
 */
organiserRouter.get("/events/top", organiserMiddleware, async (req: Request, res: Response) => {
    try {
        const organiserId = req.organiserId as string | undefined;
        if (!organiserId)
            return res.status(403).json({
                message: "Unauthenticated",
            });

        const limit = Math.max(1, parseInt((req.query.limit as string) || "5", 10));
        const sortBy = (req.query.sortBy as string) || "revenue";
        const orderByCol = sortBy === "tickets" ? "ticketsSold" : "totalRevenue";

        const topEvents = (await db.$queryRawUnsafe(
            `
            SELECT 
                e.id AS "eventId",
                e.title AS "eventName",
                COALESCE(SUM(t."ticket_count"), 0) AS "ticketsSold",
                COALESCE(SUM(t.amount), 0) AS "totalRevenue"
            FROM "Transaction" t
            INNER JOIN "Ticket" tk ON t."ticketId" = tk.id
            INNER JOIN "EventSlot" es ON tk."eventSlotId" = es.id
            INNER JOIN "Event" e ON es."eventId" = e.id
            WHERE e."organiserId" = $1
                AND t.type = 'PURCHASE'
            GROUP BY e.id, e.title
            ORDER BY ${orderByCol} DESC
            LIMIT $2;
            `,
            organiserId,
            limit,
        )) as {
            eventId: string;
            eventName: string;
            ticketsSold: number;
            totalRevenue: number;
        }[];

        return res.status(200).json({
            data: topEvents,
            message: "Top performing events fetched successfully",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: error instanceof Error ? error.message : error,
            message: "Internal error occurred",
        });
    }
});

/**
 * @route GET /events/revenue
 * @desc Revenue trend for a given date range (daily totals)
 * @query startDate YYYY-MM-DD, endDate YYYY-MM-DD
 */
organiserRouter.get("/events/revenue", organiserMiddleware, async (req: Request, res: Response) => {
    try {
        const organiserId = req.organiserId as string | undefined;
        if (!organiserId)
            return res.status(403).json({
                message: "Unauthenticated",
            });

        const { startDate, endDate } = req.query;
        if (!startDate || !endDate) {
            return res.status(400).json({
                message: "startDate and endDate are required",
            });
        }

        const start = new Date(startDate as string);
        const end = new Date(endDate as string);
        end.setHours(23, 59, 59, 999);

        const txns = await db.transaction.findMany({
            orderBy: {
                created_at: "asc",
            },
            select: {
                amount: true,
                created_at: true,
            },
            where: {
                created_at: {
                    gte: start,
                    lte: end,
                },
                ticket: {
                    eventSlot: {
                        event: {
                            organiserId,
                        },
                    },
                },
                type: "PURCHASE",
            },
        });

        const dailyMap = new Map<string, number>();
        const dayCursor = new Date(start);
        while (dayCursor <= end) {
            const key = dayCursor.toISOString().slice(0, 10);
            dailyMap.set(key, 0);
            dayCursor.setDate(dayCursor.getDate() + 1);
        }

        txns.forEach((t) => {
            const key = t.created_at.toISOString().slice(0, 10);
            dailyMap.set(key, (dailyMap.get(key) || 0) + Number(t.amount));
        });

        const revenueData = Array.from(dailyMap.entries()).map(([date, amount]) => ({
            amount,
            date,
        }));

        return res.status(200).json({
            data: revenueData,
            message: "Revenue data fetched successfully",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: error instanceof Error ? error.message : error,
            message: "Internal error occurred",
        });
    }
});

/**
 * @route GET /balance
 * @desc Get organiser wallet balance
 */
organiserRouter.get("/balance", organiserMiddleware, async (req: Request, res: Response) => {
    try {
        const organiserId = req.organiserId as string | undefined;
        if (!organiserId)
            return res.status(403).json({
                message: "Unauthenticated",
            });

        const wallet = await db.wallet.findUnique({
            include: {
                user: true,
            },
            where: {
                userId: organiserId,
            },
        });

        if (!wallet) {
            return res.status(404).json({
                message: "Wallet not found",
            });
        }

        return res.status(200).json({
            balance: wallet,
            message: `${wallet.user.first_name} balance is fetched`,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: error instanceof Error ? error.message : error,
            message: "Internal error occurred",
        });
    }
});

/**
 * @route GET /events/:eventId/tickets
 * @desc Number of tickets sold for a specific event (only PURCHASE transactions)
 */
organiserRouter.get(
    "/events/:eventId/tickets",
    organiserMiddleware,
    async (req: Request, res: Response) => {
        try {
            const organiserId = req.organiserId as string | undefined;
            if (!organiserId)
                return res.status(403).json({
                    message: "Unauthenticated",
                });

            const eventId = req.params.eventId;
            if (!eventId)
                return res.status(400).json({
                    message: "eventId required",
                });

            const totalSold = await db.ticket.count({
                where: {
                    eventSlot: {
                        event: {
                            organiserId,
                        },
                        eventId,
                    },
                    transactions: {
                        some: {
                            type: "PURCHASE",
                        },
                    },
                },
            });

            return res.status(200).json({
                message: `Number of tickets sold for ${eventId}`,
                ticketSold: totalSold,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                error: error instanceof Error ? error.message : error,
                message: "Internal error occurred",
            });
        }
    },
);

/**
 * @route GET /events/:eventId
 * @desc Get event info (and number of slots)
 */
organiserRouter.get(
    "/events/:eventId",
    organiserMiddleware,
    async (req: Request, res: Response) => {
        try {
            const organiserId = req.organiserId as string | undefined;
            if (!organiserId)
                return res.status(403).json({
                    message: "Unauthenticated",
                });

            const eventId = req.params.eventId;
            if (!eventId)
                return res.status(400).json({
                    message: "eventId required",
                });

            const event = await db.event.findFirst({
                include: {
                    slots: true,
                },
                where: {
                    id: eventId,
                    organiserId,
                },
            });

            if (!event) {
                return res.status(404).json({
                    message: "Event not found",
                });
            }

            return res.status(200).json({
                event: {
                    created_at: event.created_at,
                    id: event.id,
                    location_name: event.location_name,
                    slotCount: event.slots.length,
                    status: event.status,
                    title: event.title,
                },
                message: "Event fetched",
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                error: error instanceof Error ? error.message : error,
                message: "Internal error occurred",
            });
        }
    },
);

export default organiserRouter;
