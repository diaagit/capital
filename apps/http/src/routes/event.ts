// Events Management Routes
/*
| **Module** | **API Endpoint** | **Method** | **Role** | **Description** |
| `/events` | `POST` | Create new event (organiser only) |
| `/events` | `GET` | List all events (filter by status, organiser, etc.) |
| `/events/:id` | `GET` | Get event details |
| `/events/:id` | `PUT` | Update event (organiser only) |
| `/events/:id` | `DELETE` | Delete event |*/

import express, { type Request, type Response, type Router } from "express";
import db from "@repo/db";
//import {Prisma} from "@repo/db"; 
import { z } from "zod";

const eventRouter: Router = express.Router();
const allowedStatuses = ["draft", "published", "cancelled"] as const;

const EventType = z.object({
    organiserId: z.string(),
    title: z.string().min(3),
    description: z.string().min(5),
    banner_url: z.string().url().optional(),
    status: z.enum(["draft", "published", "cancelled"] as const),
    location_name: z.string().min(3),
    location_url: z.string().url(),
});

const EventSlotType = z.object({
    start_time: z.string().datetime(),
    end_time: z.string().datetime(),
    capacity: z.number().positive(),
});

// Create a new event
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
        } = parsed.data;

        const organiser = await db.user.findUnique({
            where: { id: organiserId },
        });

        if (!organiser) {
            return res.status(400).json({
                message: "Organiser not found",
            });
        }

        const newEvent = await db.event.create({
            data: {
                organiserId,
                title,
                description,
                banner_url,
                status,
                location_name,
                location_url,
            },
        });

        return res.status(201).json({
            message: "Event successfully created",
            event: newEvent,
        });
    } catch (_error) {
        return res.status(500).json({
            message: "Internal server error",
        });
    }
});

// Get events List with optional filters (Status of an event, organiserId)
eventRouter.get("/", async (req: Request, res: Response) => {
    try {
        const { status, organiserId } = req.query;

        const safeStatus =
            status && allowedStatuses.includes(status as any)
                ? (status as (typeof allowedStatuses)[number])
                : undefined;

        const events = await db.event.findMany({
            where: {
                ...(safeStatus ? { status: safeStatus } : {}),
                ...(organiserId ? { organiserId: String(organiserId) } : {}),
            },
        });

        if (events.length === 0) {
            return res.status(404).json({
                message: "No events found for the given filters",
            });
        }

        return res.status(200).json(events);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// Delete an event
// Deletes event with its slots if no tickets sold
// Refund handling to be added later if we want 
// If so we need to delete tickets first then slots then event

eventRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const event = await db.event.findUnique({
            where: { id }
        })

        if (!event) {
            return res.status(404).json({
                message: "Event not found"
            });
        }

        // // Deleting tickets as well (If we want to handle refunds later)
        // await db.ticket.deleteMany({
        // where: {
        //     eventSlot: {
        //     eventId: id,
        //     },
        // },
        // });


        await db.eventSlot.deleteMany({
            where: { eventId: id },
        });


        await db.event.delete({
            where: { id }
        });

        return res.status(200).json({
            message: "Event deleted successfully"
        });

    } catch (_error) {
        return res.status(500).json({
            message: "Internal server error",
        });
    }
})

// Create a slot for a partucular event
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

        const { start_time, end_time, capacity } = parsed.data;

        const event = await db.event.findUnique({
            where: { id: eventId },
        });

        if (!event) {
            return res.status(404).json({
                message: "Event not found",
            });
        }

        const slot = await db.eventSlot.create({
            data: {
                eventId: event.id,
                start_time: new Date(start_time),
                end_time: new Date(end_time),
                capacity,
            },
        });

        return res.status(201).json({
            message: "Event slot created successfully",
            slot,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
});

// Get all slots for a particular event
eventRouter.get("/:eventId/slots", async (req: Request, res: Response) => {
  try {
    const { eventId } = req.params;

    const event = await db.event.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const slots = await db.eventSlot.findMany({
      where: { eventId },
      orderBy: { start_time: "asc" },
    });

    if (slots.length === 0) {
      return res.status(200).json({ message: "No slots found for this event", slots: [] });
    }

    return res.status(200).json({ slots });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Delete a specific slot of an event
eventRouter.delete("/:eventId/slots/:slotId", async (req: Request, res: Response) => {
    try {
        const { eventId, slotId } = req.params;

        const slot = await db.eventSlot.findFirst({
            where: {
                id: slotId,
                eventId: eventId,
            },
        });

        if (!slot) {
            return res.status(404).json({
                message: "Slot not found for this event",
            });
        }

        // // Deleting tickets as well (If we want to handle refunds later)
        // await db.ticket.deleteMany({
        //     where: { eventSlotId: slotId },
        // });

        await db.eventSlot.delete({
            where: { id: slotId },
        });

        return res.status(200).json({
            message: "Slot deleted successfully",
            slotId,
        });

    } catch (error) {
        console.error("Error deleting slot:", error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
});



export default eventRouter;
