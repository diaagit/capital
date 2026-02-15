import { CreditCard } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface WalletCard {
  id: string;
  card_number: string;
  balance: number;
  bank_name: string;
}

interface LinkedCardsProps {
  cards: WalletCard[];
  currency: string;
}

const formatCurrency = (amount: number, currency: string) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency }).format(amount);

export function LinkedCards({ cards, currency }: LinkedCardsProps) {
  return (
    <Card className="border-border/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">Linked Cards</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {cards.map((card) => (
          <div
            key={card.id}
            className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border/50"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-accent">
                <CreditCard className="h-4 w-4 text-accent-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium">{card.bank_name}</p>
                <p className="text-xs text-muted-foreground">{card.card_number}</p>
              </div>
            </div>
            <p className="text-sm font-semibold">{formatCurrency(card.balance, currency)}</p>
          </div>
        ))}
        {cards.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">No cards linked</p>
        )}
      </CardContent>
    </Card>
  );
}