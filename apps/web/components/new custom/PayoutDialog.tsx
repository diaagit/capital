import { useState } from "react";
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

interface PayoutDialogProps {
  balance: number;
  currency: string;
  cards: WalletCard[];
}

const formatCurrency = (amount: number, currency: string) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency }).format(amount);

export function PayoutDialog({ balance, currency, cards }: PayoutDialogProps) {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [card_number, setCard_number] = useState("");
  const [bank_name, setbank_name] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState("");

  const handleSubmit = async () => {
    const URL = getBackendUrl()
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

    const findBankName = cards.find((x) => {return x.card_number === card_number});
    setbank_name(findBankName?.bank_name || "");

    const getToken = await axios.get(`${URL}/transactions/token`);
    let transactionToken = getToken.data.token 
    const res = await axios.post(`${URL}/organiser/initiate`,{
        bankName: bank_name,
        cardNumber: card_number,
        token: transactionToken,
        amount: amount
    },{headers:{
        Authorization: `Bearer ${token}`
    }})
    toast.success("Transaction Processing has been started")
    if(res.status === 200){
        setPaymentUrl(`http://localhost:5173/bank/${bank_name}/deposit/${transactionToken}/${amount}`);
    }
    setSubmitted(true);
    toast.success(`Payout of ${formatCurrency(num, currency)} initiated`);
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
    <Dialog open={open} onOpenChange={(o) => (o ? setOpen(true) : handleClose())}>
      <DialogTrigger asChild>
        <Button className="gap-2">
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
  );
}