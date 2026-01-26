"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle2 } from "lucide-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface PurchaseSuccessDialogProps {
  open: boolean;
  onClose: () => void;
  ticketURL: string;
}

export default function PurchaseSuccessDialog({
  open,
  onClose,
  ticketURL,
}: PurchaseSuccessDialogProps) {
  const router = useRouter();

  useEffect(() => {
    if (!open) return;

    const timer = setTimeout(() => {
      onClose();
      router.push("/home");
    }, 5000);

    return () => clearTimeout(timer);
  }, [open, onClose, router]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md text-center">
        <DialogHeader>
          <DialogTitle className="flex flex-col items-center gap-2">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
            <span>Purchase Successful 🎉</span>
          </DialogTitle>
        </DialogHeader>

        <p className="text-sm text-muted-foreground">
          Your tickets have been booked successfully.
        </p>

        <a
          href={ticketURL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-primary underline"
        >
          View Ticket
        </a>

        <p className="text-xs text-muted-foreground mt-2">
          Redirecting to home in 5 seconds…
        </p>
      </DialogContent>
    </Dialog>
  );
}