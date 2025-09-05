// // // Ticketing routes
// // /**
// //  * | **Module** | **API Endpoint** | **Method** | **Role** | **Description** |
// //    | `/tickets/purchase` | POST | User | Purchase ticket (creates pending transaction) |
// // |  | `/tickets/my` | GET | User | Get my purchased tickets |
// // |  | `/tickets/:id` | GET | User | Ticket details (QR code etc.) |
// // |  | `/tickets/cancel/:id` | POST | User | Cancel ticket (refund if allowed) |
// // |

import db from "@repo/db";
import { createClient } from "@supabase/supabase-js";
import axios from "axios";
import express, { type Request, type Response, type Router } from "express";
import QRCode from "qrcode";
import { decrypt, signMessage } from "../utils/encrypter";
import { formatDateToIST, sendTicketEmail } from "../utils/sendTicketEmail"; // updated helper for IST

const ticketRouter: Router = express.Router();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

interface PurchaseTicketPayload {
    userId: string;
    eventSlotId: string;
    quantity: number;
    cardNumber: string;
}

// ======================= PURCHASE TICKET =======================
ticketRouter.post("/purchase", async (req: Request, res: Response) => {
    try {
        const payload: PurchaseTicketPayload = req.body;

        const { userId, eventSlotId, quantity, cardNumber } = payload;
        // const { userId, eventSlotId, quantity, cardNumber } = req.body;
        if (!userId || !eventSlotId || !quantity || !cardNumber) {
            return res.status(400).json({
                message: "userId, eventSlotId, quantity, and cardNumber are required",
            });
        }

        // 1. Fetch user
        const user = await db.user.findUnique({
            where: {
                id: userId,
            },
        });
        if (!user || !user.encrypted_private_key)
            return res.status(404).json({
                message: "User not found or not verified",
            });

        // 2. Fetch event slot
        const slot = await db.eventSlot.findUnique({
            include: {
                event: true,
                tickets: true,
            },
            where: {
                id: eventSlotId,
            },
        });
        if (!slot)
            return res.status(404).json({
                message: "Event slot not found",
            });
        if (slot.tickets.length + quantity > slot.capacity)
            return res.status(400).json({
                message: "Not enough capacity in this slot",
            });

        // 3. Set ticket price
        const ticketPrice = (slot as any).price ?? 100;
        const totalAmount = ticketPrice * quantity;

        // 4. Create transaction token and initiate/withdraw
        const token = crypto.randomUUID();

        await axios.post("http://webhook:3002/webhook/initiate", {
            amount: totalAmount.toString(),
            cardNumber,
            token,
        });
        await axios.post("http://webhook:3002/webhook/withdraw", {
            token,
        });

        // 5. Prepare event slot times in IST
        const eventDateIST = formatDateToIST(slot.start_time).split(",")[0];
        const startTimeIST = formatDateToIST(slot.start_time).split(",")[1].trim();
        const endTimeIST = formatDateToIST(slot.end_time).split(",")[1].trim();

        // 6. Create tickets
        const createdTickets = [];
        for (let i = 0; i < quantity; i++) {
            const ticketPayload = {
                eventDate: eventDateIST,
                eventEndTime: endTimeIST,
                eventId: slot.eventId,
                eventLocation: slot.event.location_name,
                eventSlotId,
                eventStartTime: startTimeIST,
                eventTitle: slot.event.title,
                issuedAt: new Date().toISOString(),
                quantity, // number of tickets
                userId,
            };

            const payloadString = JSON.stringify(ticketPayload);
            const userPrivateKey = decrypt(user.encrypted_private_key);
            const signature = await signMessage(payloadString, userPrivateKey);

            const qrBuffer = await QRCode.toBuffer(
                JSON.stringify({
                    ...ticketPayload,
                    signature,
                }),
            );
            const fileName = `tickets/${userId}-${Date.now()}-${i}.png`;

            const { error: uploadError } = await supabase.storage
                .from("tickets")
                .upload(fileName, qrBuffer, {
                    contentType: "image/png",
                });
            if (uploadError) throw uploadError;

            const { data: publicUrlData } = supabase.storage.from("tickets").getPublicUrl(fileName);
            const qrCodeUrl = publicUrlData.publicUrl;

            const ticket = await db.ticket.create({
                data: {
                    eventSlotId,
                    qr_code_data: qrCodeUrl,
                    signature,
                    userId,
                },
            });

            createdTickets.push(ticket);
        }

        // 7. Send ticket email
        const email = user.email?.trim();
        const attendeeName = `${user.first_name?.trim() || ""} ${user.last_name?.trim() || ""}`;
        if (!email)
            return res.status(400).json({
                message: "User email missing, cannot send ticket",
            });

        await sendTicketEmail({
            attendeeName,
            baseAmount: totalAmount,
            bookingDateTime: new Date().toISOString(),
            convenienceFee: 0,
            email,
            eventDate: eventDateIST,
            eventLocation: slot.event.location_name,
            eventTime: `${startTimeIST} - ${endTimeIST}`,
            eventTitle: slot.event.title,
            gstAmount: 0,
            gstRate: 0,
            organiser: `${slot.event.organiserId || ""}`,
            paymentType: "Card",
            qrCodeUrl: createdTickets[0].qr_code_data,
            quantity,
            seats: `General Admission x${quantity}`,
            totalPaid: totalAmount,
        });

        res.status(201).json({
            message: "Tickets purchased successfully",
            tickets: createdTickets,
        });
    } catch (err) {
        console.error(err?.response?.data || err.message);
        return res.status(500).json({
            error: err?.response?.data || err,
            message: "Internal server error",
        });
    }
});

export default ticketRouter;
