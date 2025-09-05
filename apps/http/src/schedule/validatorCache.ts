import db from "@repo/db";
import cron from "node-cron";

//not correct I have to fix

cron.schedule("*/30 * * * * *", async () => {
    try {
        const _users = await db.user.findMany();
    } catch (_error) {}
});
