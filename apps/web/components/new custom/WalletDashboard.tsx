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
import { generateTransactionsPDF, generateWalletPDF } from "@/lib/pdf/OrganizerWallet";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import OrganizerWalletSkeleton from "./OrganizerWalletSkeleton";

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
  const [paymentSuccess, setpaymentSuccess] = useState<boolean>(false)

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

  useEffect(() => {
    if (paymentSuccess) {
      fetchWallet();   
      setpaymentSuccess(false);
    }
  }, [paymentSuccess]);

  if (loading) {
    return <OrganizerWalletSkeleton />;
  }

  if (!data) {
    return (
      <div className="h-full bg-background flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center space-y-4 p-6 border rounded-xl bg-card shadow-sm">

          <div className="flex justify-center">
            <div className="p-3 rounded-full bg-destructive/10">
              <Wallet className="h-6 w-6 text-destructive" />
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold">
              Unable to load wallet
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Something went wrong while fetching your wallet data.
              Please try again.
            </p>
          </div>

          <Button
            variant="outline"
            onClick={fetchWallet}
            className="w-full"
          >
            Retry
          </Button>

        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-background">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

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

          <TooltipProvider>
          <div className="flex gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => generateWalletPDF(data)}
                  className="h-8 px-3"
                >
                  Wallet PDF
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                Download wallet summary as PDF
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => generateTransactionsPDF(data.transactions)}
                  className="h-8 px-3"
                >
                  Transactions PDF
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                Download transactions report as PDF
              </TooltipContent>
            </Tooltip>

            <PayoutDialog
              balance={data.wallet.balance}
              currency={data.wallet.currency}
              cards={data.cards}
              walletId={data.wallet.id}
              paymentSuccess={paymentSuccess}
              setPaymentSuccess={setpaymentSuccess}
            />
          </div>
          </TooltipProvider>

        </div>

        <SummaryCards
          balance={data.wallet.balance}
          totalEarnings={data.summary.totalEarnings}
          totalWithdrawals={data.summary.totalWithdrawals}
          totalTicketsSold={data.summary.totalTicketsSold}
          currency={data.wallet.currency}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <IncomeChart data={data.charts.monthlyIncome} />
          </div>
          <BalanceChart
            wallet={data.charts.balances.wallet}
            cards={data.charts.balances.cards}
          />
        </div>

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