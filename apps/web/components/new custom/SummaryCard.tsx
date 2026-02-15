import { Wallet, TrendingUp, TrendingDown, Ticket } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface SummaryCardsProps {
  balance: number;
  totalEarnings: number;
  totalWithdrawals: number;
  totalTicketsSold: number;
  currency: string;
}

const formatCurrency = (amount: number, currency: string) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency }).format(amount);

const stats = (props: SummaryCardsProps) => [
  {
    label: "Wallet Balance",
    value: formatCurrency(props.balance, props.currency),
    icon: Wallet,
    accent: "text-primary",
    bg: "bg-accent",
  },
  {
    label: "Total Earnings",
    value: formatCurrency(props.totalEarnings, props.currency),
    icon: TrendingUp,
    accent: "text-chart-1",
    bg: "bg-accent",
  },
  {
    label: "Total Withdrawals",
    value: formatCurrency(props.totalWithdrawals, props.currency),
    icon: TrendingDown,
    accent: "text-chart-5",
    bg: "bg-destructive/10",
  },
  {
    label: "Tickets Sold",
    value: props.totalTicketsSold.toString(),
    icon: Ticket,
    accent: "text-chart-2",
    bg: "bg-chart-2/10",
  },
];

export function SummaryCards(props: SummaryCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats(props).map((s) => (
        <Card key={s.label} className="border-border/50">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">{s.label}</span>
              <div className={`p-2 rounded-lg ${s.bg}`}>
                <s.icon className={`h-4 w-4 ${s.accent}`} />
              </div>
            </div>
            <p className="text-2xl font-bold tracking-tight">{s.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}