import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { WalletCard } from "./LinkedCard";
import getBackendUrl from "@/lib/config";
import axios from "axios";
import { useRouter } from "next/navigation";

interface PayoutDialogProps {
  balance: number;
  currency: string;
  cards: WalletCard[];
  walletId: string;
  paymentSuccess: boolean,
  setPaymentSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

const formatCurrency = (amount: number, currency: string,) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency }).format(amount);

export function PayoutDialog({ balance, currency, cards, walletId, paymentSuccess, setPaymentSuccess}: PayoutDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [card_number, setCard_number] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [iframeUrl, setIframeUrl] = useState<string | null>(null);

  useEffect(()=>{
    const token = localStorage.getItem("token");
    if(!token){
        toast.warning("You are not logged in")
        router.push("/organizer/login")
    }
  },[])

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data === "PAYMENT_SUCCESS") {
        setIframeUrl(null);
        toast.success("Payout completed successfully!");
        setPaymentSuccess(!paymentSuccess)
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);
  
  const handleSubmit = async () => {
    try {
      const URL = getBackendUrl();
      const token = localStorage.getItem("token");

      const num = parseFloat(amount);
      if (!num || num <= 0) {
        toast.error("Enter a valid amount");
        return;
      }
      if (num > balance) {
        toast.error("Amount exceeds wallet balance");
        return;
      }
      if (!card_number) {
        toast.error("Select a destination card");
        return;
      }

      const findBankName = cards.find((x) => x.card_number === card_number);
      if (!findBankName) {
        toast.error("Invalid card selected");
        return;
      }

      const bankName = findBankName.bank_name;

      const { data } = await axios.get(`${URL}/transactions/token`);
      const transactionToken = data.token;

      const res = await axios.post(
        `${URL}/organiser/initiate`,
        {
          bankName,
          cardNumber: card_number,
          token: transactionToken,
          amount,
          walletId: walletId
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (res.status === 200) {
        const redirectUrl = `http://localhost:5173/bank/${bankName}/payout/${transactionToken}/${amount}`;

        toast.success("Redirecting to bank...");
        setOpen(false);
        setTimeout(() => {
          setIframeUrl(redirectUrl);
        }, 800);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setAmount("");
      setCard_number("");
      setSubmitted(false);
    }, 200);
  };

  return (
    <>
      {iframeUrl && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white w-[420px] h-[600px] rounded-2xl shadow-2xl overflow-hidden relative">
            
            <button
              onClick={() => setIframeUrl(null)}
              className="absolute top-2 right-3 text-gray-500 hover:text-black"
            >
              ✕
            </button>

            <iframe
              src={iframeUrl}
              className="w-full h-full border-none"
              title="Bank Payment"
            />
          </div>
        </div>
      )}
      
      <Dialog open={open} onOpenChange={(o) => (o ? setOpen(true) : handleClose())}>
      <DialogTrigger asChild>
        <Button className="gap-2 h-8 px-3" size="sm">
          <ArrowUpRight className="h-4 w-4" />
          Request Payout
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        {submitted ? (
          <div className="flex flex-col items-center py-8 gap-4">
            <CheckCircle2 className="h-12 w-12 text-primary" />
            <DialogTitle className="text-xl">Payout Requested</DialogTitle>
            <p className="text-sm text-muted-foreground text-center">
              Your payout of {formatCurrency(parseFloat(amount), currency)} has been submitted and will be processed shortly.
            </p>
            <Button onClick={handleClose} className="mt-2">Done</Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Request Payout</DialogTitle>
              <DialogDescription>
                Available balance: {formatCurrency(balance, currency)}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount ({currency})</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  max={balance}
                />
              </div>
              <div className="space-y-2">
                <Label>Destination Card</Label>
                <Select value={card_number} onValueChange={setCard_number}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a card" />
                  </SelectTrigger>
                  <SelectContent>
                    {cards.map((card) => (
                      <SelectItem key={card.id} value={card.card_number}>
                        {card.bank_name} — {card.card_number}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={handleClose}>Cancel</Button>
              <Button onClick={handleSubmit}>Submit Payout</Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
    </>
  );
}