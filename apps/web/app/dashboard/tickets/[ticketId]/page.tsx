import TicketDetails from "@/components/new custom/TicketDetails";

interface PageProps {
    params: Promise<{ ticketId: string }>;
}

const Page = async ({ params }: PageProps) => {
    const { ticketId } = await params;
    return <TicketDetails ticketId={ticketId} />;
};

export default Page;