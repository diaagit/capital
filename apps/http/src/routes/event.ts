import redisCache from "@repo/cache";
import db, {
    type EventCategory,
    type EventGenre,
    type EventLanguage,
    type EventStatus,
    type Prisma,
} from "@repo/db";
import { EventSlotType, EventType } from "@repo/types";
import express, { type Request, type Response, type Router } from "express";
import { formatDate, formatTime } from "../helper/date";
import { deleteCache } from "../schedule/eventCache";

const eventRouter: Router = express.Router();

/**
 * Create a new event
 */
eventRouter.post("/", async (req: Request, res: Response) => {
    try {
        const parsed = EventType.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({
                errors: parsed.error.format(),
                message: "Validation failed",
            });
        }

        const {
            organiserId,
            title,
            description,
            banner_url,
            status,
            hero_image_url,
            category,
            genre,
            language,
            is_online,
        } = parsed.data;

        const organiser = await db.user.findUnique({
            where: {
                id: organiserId,
            },
        });
        if (!organiser) {
            return res.status(400).json({
                message: "Organiser not found",
            });
        }

        const newEvent = await db.event.create({
            data: {
                banner_url,
                category,
                description,
                genre,
                hero_image_url,
                is_online,
                language,
                organiserId,
                status,
                title,
            },
        });
        await deleteCache();
        return res.status(201).json({
            event: newEvent,
            message: "Event successfully created",
        });
    } catch (_error) {
        return res.status(500).json({
            message: "Internal server error",
        });
    }
});

/**
 * Get events with optional filters
 * Filters: status, organiser, title, location (slot-based), date, category, genre, language, price
 */
eventRouter.get("/", async (req: Request, res: Response) => {
    try {
        const {
            status,
            organiser,
            title,
            location,
            category,
            genre,
            language,
            minPrice,
            maxPrice,
            isOnline,
            date, // YYYY-MM-DD
            startDate, // YYYY-MM-DD
            endDate, // YYYY-MM-DD
            page = "1",
            limit = "10",
            all,
            sortBy = "created_at",
            order = "desc",
        } = req.query;

        const pageNum = Math.max(1, Number(page));
        const limitNum = Math.max(1, Number(limit));
        const isAll = all === "true";

        const cacheKey = `events:${JSON.stringify({
            category,
            date,
            endDate,
            genre,
            isOnline,
            language,
            limit: isAll ? "all" : limitNum,
            location,
            maxPrice,
            minPrice,
            order,
            organiser,
            page: isAll ? "all" : pageNum,
            sortBy,
            startDate,
            status,
            title,
        })}`;

        const cached = await redisCache.get(cacheKey);
        if (cached) {
            return res.json(JSON.parse(cached.toString()));
        }

        const slotFilters: Prisma.EventSlotWhereInput = {
            ...(location && {
                location_name: {
                    contains: location as string,
                    mode: "insensitive",
                },
            }),
            ...(minPrice && {
                price: {
                    gte: Number(minPrice),
                },
            }),
            ...(maxPrice && {
                price: {
                    lte: Number(maxPrice),
                },
            }),
            ...(date && {
                event_date: new Date(date as string),
            }),
            ...(startDate || endDate
                ? {
                      event_date: {
                          ...(startDate && {
                              gte: new Date(startDate as string),
                          }),
                          ...(endDate && {
                              lte: new Date(endDate as string),
                          }),
                      },
                  }
                : {}),
        };

        const where: Prisma.EventWhereInput = {
            ...(status && {
                status: status as EventStatus,
            }),
            ...(category && {
                category: category as EventCategory,
            }),
            ...(genre && {
                genre: genre as EventGenre,
            }),
            ...(language && {
                language: language as EventLanguage,
            }),
            ...(isOnline !== undefined && {
                is_online: isOnline === "true",
            }),
            ...(title && {
                title: {
                    contains: title as string,
                    mode: "insensitive",
                },
            }),
            ...(organiser && {
                organiser: {
                    first_name: {
                        contains: organiser as string,
                        mode: "insensitive",
                    },
                },
            }),
            ...(Object.keys(slotFilters).length && {
                slots: {
                    some: slotFilters,
                },
            }),
        };

        const total = await db.event.count({
            where,
        });

        const events = await db.event.findMany({
            include: {
                organiser: {
                    select: {
                        first_name: true,
                        id: true,
                    },
                },
                slots: true,
            },
            where,
            ...(isAll
                ? {}
                : {
                      skip: (pageNum - 1) * limitNum,
                      take: limitNum,
                  }),
            orderBy:
                sortBy === "price"
                    ? {
                          created_at: "desc",
                      }
                    : {
                          [sortBy as string]: order,
                      },
        });

        const enriched = events.map((event) => {
            const prices = event.slots.map((s) => Number(s.price)).filter((p) => !Number.isNaN(p));

            return {
                ...event,
                maxPrice: prices.length ? Math.max(...prices) : 0,
                startingPrice: prices.length ? Math.min(...prices) : 0,
            };
        });

        if (sortBy === "price") {
            enriched.sort((a, b) =>
                order === "asc"
                    ? a.startingPrice - b.startingPrice
                    : b.startingPrice - a.startingPrice,
            );
        }

        const response = {
            events: enriched,
            limit: isAll ? null : limitNum,
            page: isAll ? null : pageNum,
            total,
        };

        await redisCache.set(cacheKey, JSON.stringify(response), {
            EX: 30,
        });

        return res.json(response);
    } catch (error) {
        console.error("EVENT ROUTE ERROR:", error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
});

/**
 * Delete an event and its slots
 */
eventRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const event = await db.event.findUnique({
            where: {
                id,
            },
        });
        if (!event) {
            return res.status(404).json({
                message: "Event not found",
            });
        }

        await db.eventSlot.deleteMany({
            where: {
                eventId: id,
            },
        });
        await db.event.delete({
            where: {
                id,
            },
        });
        await deleteCache();
        return res.status(200).json({
            message: "Event deleted successfully",
        });
    } catch (_error) {
        return res.status(500).json({
            message: "Internal server error",
        });
    }
});

/**
 * Create a slot for an event
 */
eventRouter.post("/:eventId/slots", async (req: Request, res: Response) => {
    try {
        const { eventId } = req.params;

        const parsed = EventSlotType.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({
                errors: parsed.error.format(),
                message: "Validation failed",
            });
        }

        const { location_name, location_url, event_date, start_time, end_time, capacity, price } =
            parsed.data;

        const event = await db.event.findUnique({
            where: {
                id: eventId,
            },
        });

        if (!event) {
            return res.status(404).json({
                message: "Event not found",
            });
        }

        const slot = await db.eventSlot.create({
            data: {
                capacity,
                end_time: new Date(end_time),
                event_date: new Date(event_date),
                eventId: event.id,
                location_name,
                location_url,
                price,
                start_time: new Date(start_time),
            },
        });

        await deleteCache();

        return res.status(201).json({
            message: "Event slot created successfully",
            slot,
        });
    } catch (_error) {
        return res.status(500).json({
            message: "Internal server error",
        });
    }
});

/**
 * Get all slots for an event
 */
eventRouter.get("/:eventId/slots", async (req: Request, res: Response) => {
    try {
        const { eventId } = req.params;
        const { location, capacity, event_date, minPrice, maxPrice } = req.query;

        const cacheKey = `eventSlots:${eventId}:${JSON.stringify(req.query)}`;
        const cached = await redisCache.get(cacheKey);
        if (cached) {
            return res.status(200).json(JSON.parse(cached.toString()));
        }

        const event = await db.event.findUnique({
            select: {
                banner_url: true,
                category: true,
                description: true,
                genre: true,
                hero_image_url: true,
                id: true,
                is_online: true,
                language: true,
                title: true,
            },
            where: {
                id: eventId,
            },
        });

        if (!event) {
            return res.status(404).json({
                message: "Event not found",
            });
        }

        const slotWhere: Prisma.EventSlotWhereInput = {
            eventId,
            ...(location && {
                location_name: {
                    equals: String(location),
                    mode: "insensitive",
                },
            }),
            ...(capacity && {
                capacity: {
                    gte: Number(capacity),
                },
            }),
            ...(event_date && {
                event_date: {
                    gte: new Date(`${event_date}T00:00:00.000Z`),
                    lt: new Date(`${event_date}T23:59:59.999Z`),
                },
            }),
            ...(minPrice || maxPrice
                ? {
                      price: {
                          ...(minPrice && {
                              gte: Number(minPrice),
                          }),
                          ...(maxPrice && {
                              lte: Number(maxPrice),
                          }),
                      },
                  }
                : {}),
        };

        const slots = await db.eventSlot.findMany({
            orderBy: [
                {
                    event_date: "asc",
                },
                {
                    start_time: "asc",
                },
            ],
            where: slotWhere,
        });

        const formattedSlots = slots.map((slot) => ({
            capacity: slot.capacity,
            endTime: formatTime(slot.end_time),

            eventDate: formatDate(slot.event_date),
            id: slot.id,
            location: slot.location_name,
            locationUrl: slot.location_url,
            price: Number(slot.price),

            raw: {
                end_time: slot.end_time.toISOString(),
                event_date: slot.event_date.toISOString(),
                start_time: slot.start_time.toISOString(),
            },
            startTime: formatTime(slot.start_time),
        }));

        const response = {
            event,
            meta: {
                locations: [
                    ...new Set(slots.map((s) => s.location_name)),
                ],
                totalSlots: formattedSlots.length,
            },
            slots: formattedSlots,
        };

        await redisCache.set(cacheKey, JSON.stringify(response), {
            EX: 30,
        });

        return res.status(200).json(response);
    } catch (error) {
        console.error("EVENT SLOT ERROR:", error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
});

/**
 * Delete a specific slot
 */
eventRouter.delete("/:eventId/slots/:slotId", async (req: Request, res: Response) => {
    try {
        const { eventId, slotId } = req.params;

        const slot = await db.eventSlot.findFirst({
            where: {
                eventId,
                id: slotId,
            },
        });
        if (!slot) {
            return res.status(404).json({
                message: "Slot not found for this event",
            });
        }

        await db.eventSlot.delete({
            where: {
                id: slotId,
            },
        });
        await deleteCache();

        return res.status(200).json({
            message: "Slot deleted successfully",
            slotId,
        });
    } catch (_error) {
        return res.status(500).json({
            message: "Internal server error",
        });
    }
});

export default eventRouter;
