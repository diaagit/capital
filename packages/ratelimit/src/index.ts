import type { Request } from "express";
import rateLimit, { ipKeyGenerator } from "express-rate-limit";

const createRateLimiter = (minutes: number, limit: number, message: string) =>
    rateLimit({
        keyGenerator: (req: Request) => req.body?.email || ipKeyGenerator(req.ip),
        legacyHeaders: false,
        limit,
        message,
        standardHeaders: true,
        statusCode: 429,
        windowMs: minutes * 60 * 1000,
    });

export const otpLimits = createRateLimiter(
    5,
    3,
    "Too many requests, please try again after 5 minutes",
);
export const resetPasswordLimits = createRateLimiter(
    10,
    3,
    "Too many requests, please try again after 10 minutes",
);
export const ticketPurchaseLimits = createRateLimiter(
    5,
    3,
    "Too many requests, please try again after 5 minutes",
);
