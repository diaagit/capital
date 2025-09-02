import redisCache from "@repo/cache";
import db from "@repo/db";
import cron from "node-cron";

cron.schedule("*/30 * * * * *", async () => {
    try {
        const events = await db.event.findMany({
            include: {
                organiser: {
                    select: {
                        first_name: true,
                        id: true,
                    },
                },
            },
        });
        await redisCache.set("events:all", JSON.stringify(events), {
            EX: 60,
        });
    } catch (_error) {}
});

cron.schedule("*/30 * * * * *", async () => {
    try {
        const eventSlots = await db.eventSlot.findMany();
        await redisCache.set("eventSlots:all", JSON.stringify(eventSlots), {
            EX: 60,
        });
    } catch (_error) {}
});

export async function deleteCache() {
    try {
        const eventKeys = await redisCache.keys("events:*");
        const slotKeys = await redisCache.keys("eventSlots:*");
        const keys = [
            ...eventKeys,
            ...slotKeys,
        ];
        if (keys.length > 0) {
            await redisCache.del(keys);
        }
    } catch (_error) {}
}
