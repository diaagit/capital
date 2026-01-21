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
import { filterEvents } from "../helper/eventFilters";
import { paginate } from "../helper/pagination";
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
            location_name,
            location_url,
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
                is_online,
                language,
                location_name,
                location_url,
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
 * Get events with optional filters (status, organiser name, title, location, price, category, genre, minPrice, maxPrice, pade)
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
            page = "1",
            limit = "10",
            all,
            sortBy = "created_at",
            order = "desc",
        } = req.query;

        const pageNum = Math.max(1, Number(page));
        const limitNum = Math.max(1, Number(limit));
        const isAll = all === "true";

        const cacheKey = `events:${JSON.stringify(req.query)}`;
        const cached = await redisCache.get(cacheKey);
        if (cached) return res.json(JSON.parse(cached.toString()));

        let events: any[] = [];
        let total = 0;

        const allEventsCache = await redisCache.get("events:all");

        if (allEventsCache) {
            const allEvents = JSON.parse(allEventsCache.toString());

            events = filterEvents(allEvents, {
                category: category as string,
                genre: genre as string,
                isOnline: isOnline !== undefined ? isOnline === "true" : undefined,
                language: language as string,
                location: location as string,
                maxPrice: maxPrice ? Number(maxPrice) : undefined,
                minPrice: minPrice ? Number(minPrice) : undefined,
                organiser: organiser as string,
                status: status as string,
                title: title as string,
            });

            total = events.length;
            if (!isAll) events = paginate(events, pageNum, limitNum);
        } else {
            const where = {
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
                        mode: "insensitive" as Prisma.QueryMode,
                    },
                }),
                ...(location && {
                    location_name: {
                        contains: location as string,
                        mode: "insensitive" as Prisma.QueryMode,
                    },
                }),
                ...(organiser && {
                    organiser: {
                        first_name: {
                            contains: organiser as string,
                            mode: "insensitive" as Prisma.QueryMode,
                        },
                    },
                }),
                ...(minPrice || maxPrice
                    ? {
                          slots: {
                              some: {
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
                              },
                          },
                      }
                    : {}),
            };

            total = await db.event.count({
                where,
            });

            events = await db.event.findMany({
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
        }

        const enriched = events.map((event) => {
            const prices = event.slots.map((s: any) => Number(s.price));
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
        console.error(error);
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

        const { start_time, end_time, capacity, price } = parsed.data;

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
                eventId: event.id,
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
        const cachedKey = `eventSlots:${eventId}`;
        const cached = await redisCache.get(cachedKey);
        if (cached) {
            return res.status(200).json(JSON.parse(cached.toString()));
        }

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

        const slots = await db.eventSlot.findMany({
            orderBy: {
                start_time: "asc",
            },
            where: {
                eventId,
            },
        });

        await redisCache.set(cachedKey, JSON.stringify(slots), {
            EX: 30,
        });
        return res.status(200).json({
            slots,
        });
    } catch (_error) {
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
