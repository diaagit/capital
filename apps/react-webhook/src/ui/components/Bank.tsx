import type { BankName } from "@repo/db";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

const baseUrl = "http://localhost:3002/api/v1/webhook/transaction/";

const transactionMap: Record<string, string> = {
  withdraw: `${baseUrl}/withdraw`,
  deposit: `${baseUrl}/deposit`,
  refund: `${baseUrl}/refund`,
  payout: `${baseUrl}/payout`,
};

const providerMap: Record<BankName, string> = {
  hdfc: "/hdfcbank.png",
  icic: "/icicbank.png",
  kotak: "/kotak.png",
  yesbank: "/yesbank.png",
  bob: "/bob.png",
};

export default function Bank() {
  const { provider, type, token } = useParams<{
    provider: BankName;
    type: keyof typeof transactionMap;
    token: string;
    amount: string;
  }>();

  const [searchParams] = useSearchParams();
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error" | "loading">("idle");

  const transactionType = transactionMap[type ?? "deposit"];
  const providerLogo = provider ? providerMap[provider] : "";

  useEffect(() => {
    const amt = searchParams.get("amount");
    if (amt) setAmount(amt);
  }, [searchParams]);

  const handleSubmit = useCallback(async () => {
    if (!provider || !amount || !token || !type || !transactionType) return;
    setStatus("loading");

    try {
      const result = await axios.post(transactionType, { token });
      if (result.status === 200) {
        setStatus("success");
        setTimeout(() => window.close(), 5000);
      }
    } catch (error) {
      console.error("Webhook error:", error);
      setStatus("error");
    }
  }, [provider, amount, token, type, transactionType]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-zinc-100 to-blue-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white/90 backdrop-blur-lg shadow-2xl border border-zinc-200 p-8 transition-all duration-500 hover:shadow-blue-200/50 animate-fadeIn">

        <div className="h-1 w-full bg-zinc-200 rounded-full overflow-hidden mb-6">
          <div className="h-full bg-blue-600 w-2/3 animate-[progress_2s_ease-in-out_infinite_alternate]" />
        </div>

        <div className="text-center mb-8">
          {providerLogo && (
            <img src={providerLogo} alt={`${provider} Logo`} className="h-16 mx-auto mb-3 drop-shadow-md" />
          )}
          <h1 className="text-2xl font-semibold text-gray-900">{provider?.toUpperCase()} Netbanking</h1>
          <p className="text-sm text-gray-500">
            Securely process your{" "}
            <span className="font-medium text-blue-600">
              {type === "withdraw"
                ? "Withdrawal"
                : type
                ? type.charAt(0).toUpperCase() + type.slice(1)
                : ""}
            </span>{" "}
            request
          </p>
        </div>

        <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100 p-4 mb-6 shadow-inner">
          <div className="space-y-3 text-sm">
            <div className="flex justify-between border-b border-gray-100 pb-2">
              <span className="text-gray-600">Amount</span>
              <span className="font-semibold text-gray-900 text-base">₹ {amount}</span>
            </div>
            <div className="flex justify-between border-b border-gray-100 pb-2">
              <span className="text-gray-600">Transaction Type</span>
              <span className="text-gray-900 font-medium capitalize">{type}</span>
            </div>
            <div className="flex justify-between border-b border-gray-100 pb-2">
              <span className="text-gray-600">Token</span>
              <span className="font-mono text-gray-700 text-xs break-all">{token}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Provider</span>
              <span className="text-gray-900 font-medium uppercase">{provider}</span>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            disabled={status === "loading"}
            className={`px-6 py-3 rounded-xl w-full font-medium text-white transition-all duration-200 shadow-lg active:scale-95 ${
              status === "loading"
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 hover:shadow-xl"
            }`}
            onClick={handleSubmit}
          >
            {status === "loading" ? "Processing..." : "Proceed to Authorize"}
          </button>
        </div>

        {status === "success" && (
          <p className="text-center text-green-600 mt-4 text-sm">
            ✅ Transaction authorized successfully. Closing in 5 seconds...
          </p>
        )}
        {status === "error" && (
          <p className="text-center text-red-600 mt-4 text-sm">
            ❌ Something went wrong. Please try again.
          </p>
        )}

        <div className="text-center mt-6 text-xs text-gray-500">
          <div className="flex items-center justify-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2l4-4m6 2a9 9 0 11-18 0a9 9 0 0118 0z" />
            </svg>
            <p>Secured by {provider?.toUpperCase()} | 256-bit encryption</p>
          </div>
        </div>
      </div>
    </div>
  );
}