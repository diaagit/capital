"use client"
import { useState } from "react";
import BookingSidebar from "../new custom/BookingSidebar";
import LNavbar from "../new custom/LNavbar";
import PaymentMethods from "../new custom/PaymentMethods";

interface BookingPageProps {
    eventId: string;
    slotId: string;
}

export default function BookingPage({eventId,slotId}: BookingPageProps) {
    const [card,setCard] = useState<string>("");
    return (
        <div className="h-screen bg-gray-100 flex flex-col overflow-hidden">
            <LNavbar type="search" />

            <div className="flex flex-1 gap-4 p-4 overflow-hidden">
                <div className="flex-[3] overflow-hidden">
                <PaymentMethods card={card} setCard={setCard}/>
                </div>

                <div className="flex-[1] overflow-hidden">
                <BookingSidebar eventId={eventId} slotId={slotId} card={card} />
                </div>
            </div>
        </div>
    )
}