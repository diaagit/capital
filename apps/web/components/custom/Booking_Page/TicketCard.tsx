'use client';

import { useState, FC } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Armchair, Ticket } from 'lucide-react';
import TicketModal from './TicketModal';


const TicketCard: FC = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div
        className="bg-[#191919] text-white p-4 rounded-2xl transform transition duration-200
          hover:-translate-y-1 hover:scale-101 hover:cursor-pointer"
      >
        <div className="flex flex-col items-start gap-1">
          <div className="flex justify-between items-center w-full">
            <div className="flex gap-4 items-center">
              <Armchair />
              <div className="font-bold text-xl">Section VIP</div>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-[#C14FE6]">₹2499</span>
              <span className="text-[#C14FE6] text-sm">/per</span>
            </div>
          </div>

          <div className="flex gap-2 items-center mt-2">
            <Ticket className="w-5 h-5" />
            <div>2 tickets, seated together</div>
          </div>

          <div className="flex justify-between items-center w-full mt-4">
            <div className="flex gap-2">
              <Badge className="bg-[#252018] text-[#fbbc5e] px-3 py-1 text-xs rounded-xl">
                Popular
              </Badge>
              <Badge className="bg-[#252018] text-[#fbbc5e] px-3 py-1 text-xs rounded-xl">
                Best Selling
              </Badge>
            </div>
            <Button
              onClick={() => setOpenModal(true)}
              className="bg-[#191919] text-[#C14FE6] border-2 border-[#C14FE6]
                hover:bg-[#C14FE6] hover:text-white transition duration-200
                hover:-translate-y-1 hover:scale-105 hover:cursor-pointer"
            >
              Book
            </Button>
          </div>
        </div>
      </div>

      <TicketModal open={openModal} onOpenChange={setOpenModal} />
    </>
  );
};

export default TicketCard;
