import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TicketCard from "@/components/custom/Booking_Page/TicketCard";

const Ticket = () => {
  return (
    <div className="w-2/6">
      <div className="bg-[#1e1e1e] rounded-lg text-white flex justify-between items-center px-3 py-2">
        <div>5 listings</div>
        <div className="flex items-center gap-2">
          <div className="text-zinc-400">Sort By:</div>
          <Select>
            <SelectTrigger className="w-[120px] border-none text-md">
              <SelectValue placeholder="Price" />
            </SelectTrigger>
            <SelectContent className="bg-[#1f1f1f] border-none shadow-[0_4px_20px_rgba(0,0,0,0.7)] rounded-md">
              <SelectItem value="over-2000" className="text-white hover:bg-zinc-800">
                Over ₹2000
              </SelectItem>
              <SelectItem value="1000-2000" className="text-white hover:bg-zinc-800">
                ₹1000 - ₹2000
              </SelectItem>
              <SelectItem value="500-1000" className="text-white hover:bg-zinc-800">
                ₹500 - ₹1000
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-4">
        {[...Array(5)].map((_, i) => (
          <TicketCard key={i} />
        ))}
      </div>
    </div>
  );
};

export default Ticket;
