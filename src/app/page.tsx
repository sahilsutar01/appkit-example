"use client";

import { useAccount, useSendTransaction } from "wagmi";
import { parseEther } from "viem";
import { useState } from "react";

export default function Home() {
  const { isConnected } = useAccount();
  const [toAddress, setToAddress] = useState("");
  const [amount, setAmount] = useState("");

  const { sendTransaction, isPending, isSuccess } = useSendTransaction();

  const handleSend = async () => {
    try {
      sendTransaction({
        to: toAddress,
        value: parseEther(amount),
      });
    } catch (error) {
      console.error("Transaction error:", error);
    }
  };

  return (
    <main className="min-h-screen px-8 py-0 pb-12 flex-1 flex flex-col items-center bg-white">
      <header className="w-full py-4 flex justify-between items-center">
        <div className="flex items-center">
          <div className="hidden sm:inline text-xl font-bold">reown AppKit example app</div>
        </div>
        <div className="flex items-center">
          <w3m-button />
        </div>
      </header>

      {isConnected && (
        <div className="mt-10 w-full max-w-md">
          <h2 className="text-lg font-semibold mb-4">Send Token</h2>
          <input
            type="text"
            placeholder="Recipient address"
            value={toAddress}
            onChange={(e) => setToAddress(e.target.value)}
            className="w-full mb-4 px-4 py-2 border rounded"
          />
          <input
            type="text"
            placeholder="Amount in BNB"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full mb-4 px-4 py-2 border rounded"
          />
          <button
            onClick={handleSend}
            disabled={isPending}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {isPending ? "Sending..." : "Send"}
          </button>
          {isSuccess && (
            <p className="text-green-600 mt-4">✅ Transaction sent successfully!</p>
          )}
        </div>
      )}
    </main>
  );
}