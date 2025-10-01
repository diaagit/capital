import redisCache from "@repo/cache";
import db from "@repo/db";
import { DepositSchema, type WithdrawResponse } from "@repo/types";
import express, { type Request, type Response, type Router } from "express";

const transactionRouter: Router = express.Router();

interface TransactionErrorResponse {
    message?: string;
    errors?: unknown;
    error?: string;
}

const client = redisCache;
const Queue_name = "transactions:pending";

/**
 * Initiates a transaction.
 * @route POST /transaction/initiate
 * @body {string} token - Transaction token.
 * @body {string} amount - Amount (2-4 digits).
 * @body {string} cardNumber - Card in format 1234-5678-9012-1234.
 * @body {string} [bankName] - Optional bank name.
 * @returns {200|400|500} JSON response with message or errors.
 */
// transactionRouter.post("/initiate", async (req: Request, res: Response) => {
//     try {
//         const parsedData = InitiateSchema.safeParse(req.body);
//         if (!parsedData.success) {
//             return res.status(400).json({
//                 errors: parsedData.error.flatten(),
//                 message: "Invalid data was provided",
//             });
//         }
//         const { token, amount, cardNumber } = parsedData.data;

//         const Amount = new Decimal(amount);
//         await db.$transaction(async (tx: Prisma.TransactionClient) => {
//             if (Amount.lessThanOrEqualTo(0)) {
//                 throw new Error("Amount must be greater than zero");
//             }
//             const checkCard = await tx.card.findUnique({
//                 where: {
//                     card_number: cardNumber,
//                 },
//             });
//             if (!checkCard) {
//                 throw new Error("Invalid card was provided");
//             }
//             await tx.transaction.create({
//                 data: {
//                     amount,
//                     bank_name: checkCard.bank_name,
//                     cardId: checkCard.id,
//                     token,
//                     type: "Initiate",
//                     userId: checkCard.userId,
//                 },
//             });
//         });
//         return res.status(200).json({
//             message: "Transaction was successfully initialized",
//         });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({
//             error: "Internal server error",
//             message: "Internal server error",
//         });
//     }
// });

/**
 * Deposits amount into the card.
 * @route POST /transaction/deposit
 * @body {string} token - Transaction token.
 * @returns {201|400|500} JSON response with message or errors.
 */
transactionRouter.post(
    "/deposit",
    async (req: Request, res: Response<WithdrawResponse | TransactionErrorResponse>) => {
        try {
            const parsedData = DepositSchema.safeParse(req.body);
            if (!parsedData.success) {
                return res.status(400).json({
                    errors: parsedData.error.flatten(),
                    message: "Invalid data was provided",
                });
            }
            const { token } = parsedData.data;

            const findDetails = await db.transaction.findUnique({
                where: {
                    token: token,
                },
            });

            if (!findDetails) {
                return res.status(400).json({
                    message: "Invalid token was provided",
                });
            }
            if (findDetails.type === "DEPOSIT") {
                return res.status(400).json({
                    message: "Transaction already processed",
                });
            }

            await client.rPush(
                Queue_name,
                JSON.stringify({
                    amount: findDetails.amount,
                    cardId: findDetails.cardId,
                    token,
                    transactionId: findDetails.id,
                    type: "DEPOSIT",
                    userId: findDetails.userId,
                }),
            );

            // const depositAmount = new Decimal(findDetails.amount);
            // const result = await db.$transaction(async (tx: Prisma.TransactionClient) => {
            //     await tx.card.update({
            //         data: {
            //             balance: {
            //                 increment: depositAmount,
            //             },
            //         },
            //         where: {
            //             id: findDetails.cardId,
            //         },
            //     });

            //     await tx.transaction.update({
            //         data: {
            //             type: "DEPOSIT",
            //         },
            //         where: {
            //             id: findDetails.id,
            //         },
            //     });

            //     return {
            //         message: "Deposit successful",
            //     };
            // });

            return res.status(201).json({
                message: "Deposit queued for processing by worker",
            });
        } catch (_error: any) {
            console.error(_error);
            return res.status(500).json({
                message: "Internal server error",
            });
        }
    },
);

/**
 * Withdraws amount from the card.
 * @route POST /transaction/withdraw
 * @body {string} token - Transaction token.
 * @returns {201|400|404|500} JSON response with message or errors.
 */
transactionRouter.post("/withdraw", async (req: Request, res: Response) => {
    try {
        const parsedData = DepositSchema.safeParse(req.body);

        if (!parsedData.success) {
            return res.status(400).json({
                errors: parsedData.error.flatten(),
                message: "Invalid data was provided",
            });
        }

        const { token } = parsedData.data;
        const findDetails = await db.transaction.findUnique({
            where: {
                token,
            },
        });

        if (!findDetails) {
            return res.status(400).json({
                message: "Invalid token was provided",
            });
        }

        if (findDetails.type === "WITHDRAWAL") {
            return res.status(400).json({
                message: "Transaction already processed",
            });
        }
        await redisCache.rPush(
            Queue_name,
            JSON.stringify({
                amount: findDetails.amount,
                cardId: findDetails.cardId,
                token,
                transactionId: findDetails.id,
                type: "WITHDRAWAL",
                userId: findDetails.userId,
            }),
        );

        // const withdrawAmount = new Decimal(findDetails.amount);
        // const result = await db.$transaction(async (tx: Prisma.TransactionClient) => {
        //     const card = await tx.card.findUnique({
        //         where: {
        //             id: findDetails.cardId,
        //         },
        //     });

        //     if (!card) {
        //         throw new Error("Card not found");
        //     }

        //     if (card.balance.lessThan(withdrawAmount)) {
        //         throw new Error("Insufficient balance");
        //     }

        //     await tx.card.update({
        //         data: {
        //             balance: {
        //                 decrement: withdrawAmount,
        //             },
        //         },
        //         where: {
        //             id: findDetails.cardId,
        //         },
        //     });

        //     await tx.transaction.update({
        //         data: {
        //             type: "WITHDRAWAL",
        //         },
        //         where: {
        //             id: findDetails.id,
        //         },
        //     });

        //     return {
        //         message: "Withdrawal successful",
        //     };
        // });

        return res.status(201).json({
            message: "Withdraw queued for processing by worker",
        });
    } catch (error: any) {
        console.error(error);
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

transactionRouter.post("/refund", async (req: Request, res: Response) => {
    try {
        const parsedData = DepositSchema.safeParse(req.body);
        if (!parsedData.success) {
            return res.status(400).json({
                errors: parsedData.error.flatten(),
                message: "Invalid data was provided",
            });
        }
        const { token } = parsedData.data;
        const findDetails = await db.transaction.findUnique({
            where: {
                token,
            },
        });

        if (!findDetails) {
            return res.status(400).json({
                message: "Invalid token was provided",
            });
        }

        if (findDetails.type === "REFUND") {
            return res.status(400).json({
                message: "Refund already processed",
            });
        }

        await redisCache.rPush(
            Queue_name,
            JSON.stringify({
                amount: findDetails.amount.toString(),
                cardId: findDetails.cardId,
                token,
                transactionId: findDetails.id,
                type: "REFUND",
                userId: findDetails.userId,
            }),
        );
        return res.status(201).json({
            message: "Refund queued for processing by worker",
        });
    } catch (_error) {
        return res.status(500).json({
            error: "Internal server error",
        });
    }
});

transactionRouter.post("/payout", async (req: Request, res: Response) => {
    try {
        const parsedData = DepositSchema.safeParse(req.body);
        if (!parsedData.success) {
            return res.status(400).json({
                errors: parsedData.error.flatten(),
                message: "Invalid data was provided",
            });
        }
        const { token } = parsedData.data;

        const findDetails = await db.transaction.findUnique({
            where: {
                token,
            },
        });

        if (!findDetails) {
            return res.status(400).json({
                message: "Invalid token was provided",
            });
        }

        if (findDetails.type === "PAYOUT") {
            return res.status(400).json({
                message: "Payout already processed",
            });
        }
        await client.rPush(
            Queue_name,
            JSON.stringify({
                amount: findDetails.amount.toString(),
                cardId: findDetails.cardId,
                token,
                transactionId: findDetails.id,
                type: "PAYOUT",
                userId: findDetails.userId,
            }),
        );

        // await db.$transaction(async (_tx: Prisma.TransactionClient) => {
        //     await db.wallet.update({
        //         data: {
        //             balance: {
        //                 decrement: findDetails.amount,
        //             },
        //             lastPayoutAt: new Date(Date.now()),
        //         },
        //         where: {
        //             userId: findDetails.userId,
        //         },
        //     }),
        //         await db.card.update({
        //             data: {
        //                 balance: {
        //                     increment: findDetails.amount,
        //                 },
        //             },
        //             where: {
        //                 id: findDetails.cardId,
        //                 userId: findDetails.userId,
        //             },
        //         });
        //     await db.transaction.update({
        //         data: {
        //             type: "DEPOSIT",
        //         },
        //         where: {
        //             token,
        //         },
        //     });
        // });

        return res.status(201).json({
            message: "Payout queued for processing by worker",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Internal server error",
        });
    }
});

export default transactionRouter;
