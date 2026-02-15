"use client";

import { useEffect, useState } from "react";
import { Wallet } from "lucide-react";
import { LinkedCards } from "./LinkedCard";
import { TransactionTable } from "./TransactionTable";
import { PayoutDialog } from "./PayoutDialog";
import { SummaryCards } from "./SummaryCard";
import { IncomeChart } from "./IncomeChart";
import { BalanceChart } from "./BalanceChart";
import getBackendUrl from "@/lib/config";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export interface WalletData {
  wallet: {
    id: string;
    balance: number;
    currency: string;
    status: string;
    lastPayoutAt: string | null;
  };
  cards: any[];
  transactions: any[];
  summary: {
    totalEarnings: number;
    totalWithdrawals: number;
    numberOfTransactions: number;
    totalTicketsSold: number;
  };
  charts: {
    monthlyIncome: { month: string; amount: number }[];
    balances: { wallet: number; cards: number };
  };
  pagination: {
    page: number;
    limit: number;
    totalTransactions: number;
    totalPages: number;
  };
}

const WalletDashboard = () => {
  const router = useRouter();
  const [data, setData] = useState<WalletData | null>(null);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState("ALL");
  const [page, setPage] = useState(1);

  useEffect(()=>{
    const token = localStorage.getItem("token");
    if(!token){
        toast.warning("You are not logged in")
        router.push("/organizer/login")
    }
  },[])

  const fetchWallet = async () => {
    try {
      setLoading(true);
      const URL = getBackendUrl();
      const token = localStorage.getItem("token");
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "20",
      });

      if (filterType !== "ALL") {
        params.append("type", filterType);
      }

      const res = await axios.get(
        `${URL}/organiser/wallet?${params}`,
        {
          headers:{
            Authorization: `Bearer ${token}`
          }
        }
      );

      const result = await res.data;
      setData(result);
    } catch (error) {
      console.error("Failed to fetch wallet:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWallet();
  }, [page, filterType]);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-muted-foreground">Loading wallet...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-red-500">Failed to load wallet</p>
      </div>
    );
  }

  return (
    <div className="h-full bg-background">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-accent">
              <Wallet className="h-6 w-6 text-accent-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                Organizer Wallet
              </h1>
              <p className="text-sm text-muted-foreground">
                Manage your earnings, payouts & transactions
              </p>
            </div>
          </div>

          <PayoutDialog
            balance={data.wallet.balance}
            currency={data.wallet.currency}
            cards={data.cards}
          />
        </div>

        {/* Summary */}
        <SummaryCards
          balance={data.wallet.balance}
          totalEarnings={data.summary.totalEarnings}
          totalWithdrawals={data.summary.totalWithdrawals}
          totalTicketsSold={data.summary.totalTicketsSold}
          currency={data.wallet.currency}
        />

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <IncomeChart data={data.charts.monthlyIncome} />
          </div>
          <BalanceChart
            wallet={data.charts.balances.wallet}
            cards={data.charts.balances.cards}
          />
        </div>

        {/* Cards + Transactions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-1">
            <LinkedCards
              cards={data.cards}
              currency={data.wallet.currency}
            />
          </div>

          <div className="lg:col-span-2">
            <TransactionTable
              transactions={data.transactions}
              pagination={data.pagination}
              onPageChange={setPage}
              onFilterType={setFilterType}
              filterType={filterType}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletDashboard;