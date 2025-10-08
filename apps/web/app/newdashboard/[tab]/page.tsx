"use client";

import { use } from "react";
import PaymentDetails from "@/components/new custom/PaymentDetails";
import PersonalInfo from "@/components/new custom/PersonalInfo";
import TicketList from "@/components/new custom/TicketList";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    tab: string;
  }>;
}

export default function Page({ params }: PageProps) {
  const { tab } = use(params); // ✅ unwrap params

  switch (tab) {
    case "payment":
      return <PaymentDetails />;
    case "personal":
      return <PersonalInfo />;
    case "tickets":
      return <TicketList />;
    default:
      return notFound();
  }
}



// import PaymentDetails from "@/components/new custom/PaymentDetails";
// import PersonalInfo from "@/components/new custom/PersonalInfo";
// import TicketList from "@/components/new custom/TicketList";

// export default function DashboardTabPage({
//   params,
// }: {
//   params: { tab: string };
// }) {
//   const { tab } = params;

//   switch (tab) {
//     case "payment":
//       return <PaymentDetails />;
//     case "personal":
//       return <PersonalInfo />;
//     case "tickets":
//         return <TicketList/>
//     default:
//       return <TicketList />;
//   }
// }
