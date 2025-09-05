// Ticketing routes

import crypto from "node:crypto";
import db from "@repo/db";
import { createClient } from "@supabase/supabase-js";
import axios from "axios";
import express, { type Request, type Response, type Router } from "express";
import QRCode from "qrcode";
import { decrypt, signMessage } from "../utils/encrypter";
import { formatDateToIST, sendTicketEmail } from "../utils/sendTicketEmail";

const ticketRouter: Router = express.Router();

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

interface PurchaseTicketPayload {
    userId: string;
    eventSlotId: string;
    quantity: number;
    cardNumber: string;
}

ticketRouter.post("/purchase", async (req: Request, res: Response) => {
    try {
        const payload: PurchaseTicketPayload = req.body;
        const { userId, eventSlotId, quantity, cardNumber } = payload;

        if (!userId || !eventSlotId || !quantity || !cardNumber) {
            return res.status(400).json({
                message: "userId, eventSlotId, quantity, and cardNumber are required",
            });
        }

        // 1️⃣ Fetch user
        const user = await db.user.findUnique({
            where: {
                id: userId,
            },
        });
        if (!user || !user.encrypted_private_key) {
            return res.status(404).json({
                message: "User not found or not verified",
            });
        }

        // 2️⃣ Fetch event slot
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

        if (slot.tickets.length + quantity > slot.capacity) {
            return res.status(400).json({
                message: "Not enough capacity in this slot",
            });
        }

        // 3️⃣ Set ticket price
        const ticketPrice = (slot as any).price ?? 100;
        const totalAmount = ticketPrice * quantity;

        // 4️⃣ Initiate transaction
        const token = crypto.randomUUID();
        await axios.post("http://webhook:3002/api/v1/webhook/initiate", {
            amount: totalAmount.toString(),
            cardNumber,
            token,
        });
        await axios.post("http://webhook:3002/api/v1/webhook/withdraw", {
            token,
        });

        // 5️⃣ Prepare event slot times in IST
        const eventDateIST = formatDateToIST(slot.start_time).split(",")[0];
        const startTimeIST = formatDateToIST(slot.start_time).split(",")[1].trim();
        const endTimeIST = formatDateToIST(slot.end_time).split(",")[1].trim();

        // 6️⃣ Generate ticket batch
        const purchaseTicketId = crypto.randomUUID();
        const ticketPayload = {
            eventEndTime: endTimeIST,
            eventId: slot.eventId,
            eventLocation: slot.event.location_name,
            eventSlotId: slot.id,
            eventStartTime: startTimeIST,
            eventTitle: slot.event.title,
            firstName: user.first_name || "",
            issuedAt: new Date().toISOString(),
            lastName: user.last_name || "",
            quantity, // used for QR code/email only
            ticketId: purchaseTicketId,
            totalAmount,
            transactionToken: token,
        };

        // ✅ Sign once per batch
        const payloadString = JSON.stringify(ticketPayload);
        const userPrivateKey = decrypt(user.encrypted_private_key);
        const signature = await signMessage(payloadString, userPrivateKey);

        // ✅ Generate QR code once per batch
        const qrBuffer = await QRCode.toBuffer(
            JSON.stringify({
                ...ticketPayload,
                signature,
            }),
        );
        const fileName = `tickets/${userId}-${Date.now()}.png`;

        const { error: uploadError } = await supabase.storage
            .from("tickets")
            .upload(fileName, qrBuffer, {
                contentType: "image/png",
            });
        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage.from("tickets").getPublicUrl(fileName);
        const qrCodeUrl = publicUrlData.publicUrl;

        // 7️⃣ Save single ticket batch in DB
        const ticket = await db.ticket.create({
            data: {
                eventSlotId,
                qr_code_data: qrCodeUrl,
                signature,
                userId,
            },
        });

        // 8️⃣ Fetch card by cardNumber
        const card = await db.card.findUnique({
            where: {
                card_number: cardNumber,
            },
        });
        if (!card)
            return res.status(404).json({
                message: "Card not found",
            });

        // 9️⃣ Create transaction with proper cardId
        await db.transaction.create({
            data: {
                amount: totalAmount,
                cardId: card.id, // connect via PK
                ticket_count: quantity,
                ticketId: ticket.id,
                token: token, // generate fresh UUID
                type: "PURCHASE", // enum string is fine
                userId,
            },
        });

        // 9️⃣ Send ticket email
        const email = user.email?.trim();
        if (!email)
            return res.status(400).json({
                message: "User email missing, cannot send ticket",
            });

        await sendTicketEmail({
            attendeeName: `${user.first_name?.trim() || ""} ${user.last_name?.trim() || ""}`,
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
            qrCodeUrl,
            quantity,
            seats: `General Admission x${quantity}`,
            totalPaid: totalAmount,
        });

        res.status(201).json({
            message: "Tickets purchased successfully",
            ticket,
        });
    } catch (err: any) {
        console.error(err?.response?.data || err.message);
        return res.status(500).json({
            error: err?.response?.data || err,
            message: "Internal server error",
        });
    }
});

export default ticketRouter;
