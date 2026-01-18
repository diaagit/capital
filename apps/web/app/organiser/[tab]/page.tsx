"use client";

import { use } from "react";
import PaymentDetails from "@/components/new custom/PaymentDetails";
import PersonalInfo from "@/components/new custom/PersonalInfo";
import TicketList from "@/components/new custom/TicketList";
import { notFound } from "next/navigation";
import UpcomingEventsList from "@/components/new custom/UpcomingEventsList";
import BookingsList from "@/components/new custom/BookingsList";
import InvoiceList from "@/components/new custom/InvoiceList";

interface PageProps {
  params: Promise<{
    tab: string;
  }>;
}

export default function Page({ params }: PageProps) {
  const { tab } = use(params); // ✅ unwrap params

  switch (tab) {
    case "events":
      return <UpcomingEventsList />;
    case "bookings":
      return <BookingsList />;
    case "invoices":
      return <InvoiceList/>;
    default:
      return notFound();
  }
}

