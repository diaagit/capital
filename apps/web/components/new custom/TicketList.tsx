import { ChevronRight, Dot, Ticket } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

const ticketData = [
  { id: "R123", name: "Adele Concert", date: "Tue 30 Sep", time: "7:30 PM", totalPaid: "$200", tickets: 2, status: "Completed" },
  { id: "R124", name: "Adele Concert", date: "Tue 30 Sep", time: "7:30 PM", totalPaid: "$200", tickets: 2, status: "Pending" },
  { id: "R125", name: "Adele Concert", date: "Tue 30 Sep", time: "7:30 PM", totalPaid: "$200", tickets: 2, status: "Cancelled" },
];

const statusClasses: Record<string, string> = {
  Completed: "bg-green-100 text-green-600",
  Pending: "bg-yellow-100 text-yellow-600",
  Cancelled: "bg-red-100 text-red-600",
};


const TicketList = () => {
  return (
    <div className="flex flex-col gap-5 bg-white h-[79vh] rounded-2xl px-10 shadow-[0_0_0_1px_rgba(0,0,0,0.05)]">
      {/* Filter Bar */}
      <div className="mt-10">
        <Button className=" text-lg hover:cursor-pointer hover:text-[#C251E6]" variant="link">
          All (7)
        </Button>
        <Button className=" text-lg hover:cursor-pointer hover:text-[#C251E6]" variant="link">
          Pending (1)
        </Button>
        <Button className=" text-lg hover:cursor-pointer hover:text-[#C251E6]" variant="link">
          Cancelled (2)
        </Button>
        <Button className="text-lg hover:cursor-pointer hover:text-[#C251E6]" variant="link">
          Completed (4)
        </Button>
      </div>
      <Separator />
      {/* If we want to make area scrollable */}



      {/* Ticket Cards */}
      {ticketData.map((ticket) => (
        <Link key={ticket.id} href={`/newdashboard/tickets/${ticket.id}`}>
          <div className="bg-white p-5 rounded-2xl hover:shadow-[0_8px_24px_0px_rgba(149,157,165,0.2)] transition-shadow duration-300">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-bold">{ticket.name}</div>
                <div className="font-semibold"># {ticket.id}</div>
              </div>

              <Badge
                variant="default"
                className={`${statusClasses[ticket.status]} px-4 py-1`}
              >
                {ticket.status}
              </Badge>

            </div>

            <Separator className="my-2" />

            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <div className="font-semibold">Order Date: </div>
                <div className="font-semibold flex text-gray-500">
                  {ticket.date} <Dot /> {ticket.time}
                </div>
              </div>
              <div className="flex gap-2">
                <div className="font-semibold">Total Paid: </div>
                <div className="font-semibold flex text-gray-500">{ticket.totalPaid}</div>
              </div>
              <div className="flex gap-2">
                <div className="font-semibold flex">
                  <Ticket className="mr-1" />
                  Tickets:{" "}
                </div>
                <div className="font-semibold flex text-gray-500">{ticket.tickets} tickets</div>
              </div>
              <div>
                <Button
                  className="flex items-center gap-1 text-[#C251E6] p-0 hover:cursor-pointer"
                  variant="link"
                >
                  Ticket Details <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </Link>
      ))}
            </div>

  );
};

export default TicketList;
