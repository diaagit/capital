import db from "@repo/db";
import cron from "node-cron";

cron.schedule("0 */30 * * * *", async () => {
    try {
        const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
        await db.transaction.updateMany({
            data: {
                canceled_at: new Date(),
                type: "CANCEL",
            },
            where: {
                created_at: {
                    lt: thirtyMinutesAgo,
                },
                type: "Initiate",
            },
        });
    } catch (error) {
        console.error("Error at Redis Schedule", error);
    }
});
