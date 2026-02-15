import { useState } from "react";
import { format } from "date-fns";
import { ArrowUpRight, ArrowDownLeft, Ban, ChevronLeft, ChevronRight, BanknoteArrowDown, BanknoteArrowUp, CircleX, TicketX, TicketCheck, CircleArrowOutUpRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export interface TransactionTicket {
  id: string;
  event: { id: string; title: string } | null;
}

export interface TransactionCard {
  id: string;
  bank_name: string;
  card_number: string;
}

export type TransactionType = "DEPOSIT" | "PURCHASE" | "REFUND" | "PAYOUT" | "WITHDRAWAL" | "CANCEL" | "Initiate";

export interface Transaction {
  id: string;
  amount: number;
  type: TransactionType;
  createdAt: string;
  canceledAt: string | null;
  description: string;
  source: "Card" | "Wallet";
  status: "CANCELED" | "COMPLETED";
  card: TransactionCard | null;
  ticket: TransactionTicket | null;
  token: string | null;
}

interface TransactionTableProps {
  transactions: Transaction[];
  pagination: { page: number; totalPages: number; totalTransactions: number };
  onPageChange: (page: number) => void;
  onFilterType: (type: string) => void;
  filterType: string;
}

const typeConfig: Record<TransactionType, { icon: typeof ArrowUpRight; color: string }> = {
  DEPOSIT: { icon: ArrowDownLeft, color: "text-green-500" },
  PURCHASE: { icon: TicketCheck, color: "text-blue-500" },
  REFUND: { icon: TicketX, color: "text-yellow-500" },
  PAYOUT: { icon: BanknoteArrowDown, color: "text-emerald-600" },
  WITHDRAWAL: { icon: BanknoteArrowUp, color: "text-red-500" },
  CANCEL: { icon: CircleX, color: "text-gray-500" },
  Initiate: { icon: CircleArrowOutUpRight, color: "text-purple-500" },
}

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(amount);

export function TransactionTable({ transactions, pagination, onPageChange, onFilterType, filterType }: TransactionTableProps) {
  return (
    <Card className="border-border/50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <CardTitle className="text-base font-semibold">Transactions</CardTitle>
          <Select value={filterType} onValueChange={onFilterType}>
            <SelectTrigger className="w-[160px] h-9">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Types</SelectItem>
              <SelectItem value="Initiate">Initiate</SelectItem>
              <SelectItem value="DEPOSIT">Deposit</SelectItem>
              <SelectItem value="PURCHASE">Purchase</SelectItem>
              <SelectItem value="PAYOUT">Payout</SelectItem>
              <SelectItem value="WITHDRAWAL">Withdrawal</SelectItem>
              <SelectItem value="REFUND">Refund</SelectItem>
              <SelectItem value="CANCEL">Cancel</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border/50">
                <TableHead className="text-muted-foreground">Type</TableHead>
                <TableHead className="text-muted-foreground">Description</TableHead>
                <TableHead className="text-muted-foreground">Event</TableHead>
                <TableHead className="text-muted-foreground">Source</TableHead>
                <TableHead className="text-muted-foreground text-right">Amount</TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
                <TableHead className="text-muted-foreground">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((tx) => {
                const config = typeConfig[tx.type];
                const Icon = config.icon;
                return (
                  <TableRow key={tx.id} className="border-border/30">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Icon className={`h-4 w-4 ${config.color}`} />
                        <span className="text-xs font-medium capitalize">{tx.type.toLowerCase()}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm max-w-[200px] truncate">{tx.description}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{tx.ticket?.event?.title || "—"}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="text-xs font-normal">
                        {tx.source}
                      </Badge>
                    </TableCell>
                    <TableCell className={`text-right text-sm font-medium ${["WITHDRAWAL", "CANCEL"].includes(tx.type) ? "text-chart-5" : "text-chart-1"}`}>
                      {["WITHDRAWAL", "CANCEL"].includes(tx.type) ? "-" : "+"}{formatCurrency(tx.amount)}
                    </TableCell>
                    <TableCell>
                      <Badge variant={tx.status === "COMPLETED" ? "default" : "destructive"} className="text-xs">
                        {tx.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                      {format(new Date(tx.createdAt), "dd MMM yyyy")}
                    </TableCell>
                  </TableRow>
                );
              })}
              {transactions.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No transactions found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-between pt-4">
            <p className="text-sm text-muted-foreground">
              {pagination.totalTransactions} total transactions
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                disabled={pagination.page <= 1}
                onClick={() => onPageChange(pagination.page - 1)}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm text-muted-foreground">
                {pagination.page} / {pagination.totalPages}
              </span>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                disabled={pagination.page >= pagination.totalPages}
                onClick={() => onPageChange(pagination.page + 1)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}