'use client';

import Image from 'next/image';
import { useState, FC } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { CalendarDays, Clock, MapPin, Ticket } from 'lucide-react';

interface TicketModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TicketModal: FC<TicketModalProps> = ({ open, onOpenChange }) => {
  const [count, setCount] = useState(2);
  const [seatTogether, setSeatTogether] = useState(false);
  const [step, setStep] = useState<'select' | 'summary'>('select');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#1f1f1f] text-white border-none max-w-md rounded-xl p-0 pt-4 pb-6 w-1/5">
        <DialogHeader className="text-center flex flex-col items-center gap-2">
          <Image
            src="/assets/B-seats.png"
            alt="Seats"
            width={245}
            height={120}
            className="mx-auto"
          />
        </DialogHeader>

        {step === 'select' ? (
          <>
            <DialogTitle className="text-xl font-semibold text-center mt-2 mb-4">
              How Many Tickets?
            </DialogTitle>

            <div className="flex justify-center items-center gap-6 mb-4">
              <Button
                variant="outline"
                onClick={() => setCount((c) => Math.max(1, c - 1))}
                className="px-3 pb-4 text-4xl leading-[1] bg-[#191919] text-[#C14FE6] border-2 border-[#C14FE6]
                  hover:bg-[#C14FE6] hover:text-white transition duration-200 transform hover:-translate-y-1 hover:scale-105 hover:cursor-pointer"
              >
                -
              </Button>
              <span className="text-2xl font-bold">{count}</span>
              <Button
                variant="outline"
                onClick={() => setCount((c) => c + 1)}
                className="px-2 pb-4 text-4xl leading-[1] bg-[#191919] text-[#C14FE6] border-2 border-[#C14FE6]
                  hover:bg-[#C14FE6] hover:text-white transition duration-200 transform hover:-translate-y-1 hover:scale-105 hover:cursor-pointer"
              >
                +
              </Button>
            </div>

            <div className="flex items-center gap-3 px-4 mb-6">
              <Checkbox
                id="seat-together"
                checked={seatTogether}
                onCheckedChange={(val) => setSeatTogether(!!val)}
                className="border-zinc-400"
              />
              <label htmlFor="seat-together" className="text-sm leading-tight">
                We want to be seated together
                <div className="text-xs text-zinc-400">
                  Most popular quality on our site
                </div>
              </label>
            </div>

            <div className="px-4">
              <Button
                onClick={() => setStep('summary')}
                className="w-full bg-[#191919] text-[#C14FE6] border-2 border-[#C14FE6]
                  hover:bg-[#C14FE6] hover:text-white transition duration-200 hover:-translate-y-1 hover:scale-105"
              >
                BOOK
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="px-6">
              <h2 className="text-lg font-semibold mt-2 mb-4 flex items-center gap-2">
                <MapPin size={18} className="text-[#C14FE6]" />
                Ticket Information
                <span className="ml-auto bg-zinc-800 text-yellow-400 px-2 py-1 rounded text-xs">VIP</span>
              </h2>

              <div className="text-sm space-y-2 mb-4">
                <div className="flex items-center gap-2">
                  <Ticket size={16} />
                  {count} ticket{count > 1 ? 's' : ''} together
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  Fontainebleau Las Vegas
                </div>
                <div className="flex items-center gap-2">
                  <CalendarDays size={16} />
                  Mar 06 - 2025
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  20:00 - 12:00 PM
                </div>
              </div>

              <hr className="border-zinc-700 my-3" />

              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span>ROW</span>
                  <span className="font-bold">7</span>
                </div>
                <div className="flex justify-between">
                  <span>Seat 07</span>
                  <span>$450</span>
                </div>
                <div className="flex justify-between">
                  <span>Seat 08</span>
                  <span>$450</span>
                </div>
                <div className="flex justify-between font-bold pt-2">
                  <span>Total</span>
                  <span>$900</span>
                </div>
              </div>
            </div>

            <div className="flex justify-between gap-4 px-6 mt-6">
              <Button
                variant="outline"
                onClick={() => setStep('select')}
                className="bg-[#191919] text-[#C14FE6] w-1/2 border-2 border-[#C14FE6]
                  hover:bg-[#C14FE6] hover:text-white transition duration-200 transform hover:-translate-y-1 hover:scale-105 hover:cursor-pointer"
              >
                Go back
              </Button>
              <Button
                className="bg-[#C14FE6] text-white w-1/2 border-2 border-[#C14FE6]
                  hover:bg-[#C14FE6] hover:text-white transition duration-200 transform hover:-translate-y-1 hover:scale-105 hover:cursor-pointer"
                onClick={() => onOpenChange(false)}
              >
                Continue
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TicketModal;
