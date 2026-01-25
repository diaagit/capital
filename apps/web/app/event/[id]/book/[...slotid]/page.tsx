import BookingSidebar from "@/components/new custom/BookingSidebar";
import LNavbar from "@/components/new custom/LNavbar";

const Page = async ({ params }: { params: Promise<{ id: string; slotid: string[] }> }) => {
  return (
    <div className="h-screen bg-gray-100 flex flex-col overflow-hidden">
      <LNavbar type="search" />

      <div className="flex flex-1 overflow-hidden p-3 px-4 pb-4 gap-4">
        <div className="flex-[3] h-full overflow-hidden">
          <div className="h-full bg-white rounded-xl border shadow-sm flex flex-col">
            <div className="px-6 py-4 border-b shrink-0">
              <h1 className="text-xl font-semibold text-gray-900">
                Confirm Booking
              </h1>
              <p className="text-sm text-gray-500">
                Review your show details & proceed to payment
              </p>
            </div>

            <div className="flex-1 px-6 py-6 space-y-6 overflow-hidden">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-gray-700">
                  Credit Card / Debit Card 
                </h3>
                <p className="text-gray-900 mt-1">
                  Monday, 02 March 2026 • 12:00 AM
                </p>
                <p className="text-sm text-gray-500">
                  Bangalore Palace Grounds
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-gray-700">
                  Seats
                </h3>
                <p className="text-gray-900 mt-1">2 Tickets</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-gray-700">
                  Cancellation Policy
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Tickets once booked cannot be cancelled or refunded.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-[1] h-full overflow-hidden">
          <BookingSidebar />
        </div>
      </div>
    </div>
  );
};

export default Page;