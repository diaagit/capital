import LNavbar from "@/components/new custom/LNavbar";
import BookingSidebar from "@/components/new custom/BookingSidebar";
import PaymentMethods from "@/components/new custom/PaymentMethods";

const Page = async ({
  params,
}: {
  params: Promise<{ id: string; slotid: string[] }>;
}) => {
  const { id, slotid } = await params;

  return (
    <div className="h-screen bg-gray-100 flex flex-col overflow-hidden">
      <LNavbar type="search" />

      <div className="flex flex-1 gap-4 p-4 overflow-hidden">
        <div className="flex-[3] overflow-hidden">
          <PaymentMethods />
        </div>
        <div className="flex-[1] overflow-hidden">
          <BookingSidebar eventId={id} slotId={slotid[0]} />
        </div>
      </div>
    </div>
  );
};

export default Page;