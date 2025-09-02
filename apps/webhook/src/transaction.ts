import db from "@repo/db";
import Decimal from "decimal.js";
import express, { type Request, type Response, type Router } from "express";

const transactionRouter: Router = express.Router();

// Deposit endpoint
transactionRouter.post("/transactions/deposit", async (req: Request, res: Response) => {
    try {
        const { userId, amount, cardId } = req.body;
        if (!userId || !amount || !cardId) {
            return res.status(400).json({
                error: "Missing required fields",
            });
        }

        const depositAmount = new Decimal(amount);

        const result = await db.$transaction(async (tx) => {
            if (depositAmount.lessThanOrEqualTo(0)) {
                throw new Error("Deposit amount must be greater than zero");
            }

            const _updatedCard = await tx.card.update({
                data: {
                    balance: {
                        increment: depositAmount,
                    },
                },
                where: {
                    id: cardId,
                },
            });

            const transaction = await tx.transaction.create({
                data: {
                    amount: depositAmount,
                    cardId,
                    type: "DEPOSIT",
                    userId,
                },
            });

            return {
                message: "Deposit successful",
                transaction,
            };
        });

        return res.status(201).json(result);
    } catch (_error: any) {
        return res.status(500).json({
            error: "Internal server error",
        });
    }
});

// Withdraw endpoint
transactionRouter.post("/transactions/withdraw", async (req: Request, res: Response) => {
    try {
        const { userId, amount, cardId } = req.body;
        if (!userId || !amount || !cardId) {
            return res.status(400).json({
                error: "Missing required fields",
            });
        }

        const withdrawAmount = new Decimal(amount);

        const result = await db.$transaction(async (tx) => {
            const card = await tx.card.findUnique({
                where: {
                    id: cardId,
                },
            });
            if (!card) {
                throw new Error("Card not found");
            }
            if (card.balance.lessThan(withdrawAmount)) {
                throw new Error("Insufficient balance");
            }

            const _updatedCard = await tx.card.update({
                data: {
                    balance: {
                        decrement: withdrawAmount,
                    },
                },
                where: {
                    id: cardId,
                },
            });

            const transaction = await tx.transaction.create({
                data: {
                    amount: withdrawAmount,
                    cardId,
                    type: "WITHDRAWAL",
                    userId,
                },
            });

            return {
                message: "Withdrawal successful",
                transaction,
            };
        });

        return res.status(201).json(result);
    } catch (error: any) {
        if (error instanceof Error) {
            if (error.message === "Card not found") {
                return res.status(404).json({
                    error: "Card not found",
                });
            } else if (error.message === "Insufficient balance") {
                return res.status(400).json({
                    error: "Insufficient balance",
                });
            }
        }
        return res.status(500).json({
            error: "Internal server error",
        });
    }
});

export default transactionRouter;
