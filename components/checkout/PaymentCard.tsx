// components/checkout/PaymentCard.tsx
'use client';

import { CreditCard, Copy, Check, AlertCircle } from 'lucide-react';
import { useState } from 'react';

export default function PaymentCard() {
  const [copied, setCopied] = useState(false);

  const bankDetails = {
    bank: 'GTBank',
    accountName: 'PEF-HUB',
    accountNumber: '0123456789',
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(bankDetails.accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="bg-zinc-900/50 rounded-3xl border border-zinc-800 p-6 lg:p-8 sticky top-24">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-orange-500/10">
          <CreditCard className="w-5 h-5 text-orange-500" />
        </div>
        <h3 className="text-xl font-bold">Payment Details</h3>
      </div>

      <div className="space-y-4">
        <div className="p-4 rounded-xl bg-orange-500/5 border border-orange-500/10">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-zinc-400">
              Transfer the exact amount to the account below and send your
              receipt via WhatsApp.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-zinc-800">
            <span className="text-zinc-500 text-sm">Bank</span>
            <span className="font-semibold">{bankDetails.bank}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-zinc-800">
            <span className="text-zinc-500 text-sm">Account Name</span>
            <span className="font-semibold text-sm text-right">{bankDetails.accountName}</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-zinc-500 text-sm">Account Number</span>
            <div className="flex items-center gap-2">
              <span className="font-bold text-orange-500 text-lg tracking-wider">
                {bankDetails.accountNumber}
              </span>
              <button
                onClick={handleCopy}
                className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors duration-300"
                title="Copy account number"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-emerald-500" />
                ) : (
                  <Copy className="w-4 h-4 text-zinc-400" />
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 rounded-xl bg-orange-500/10 border border-orange-500/20">
          <p className="text-sm text-zinc-400 text-center">
            After payment, send your receipt to:
            <br />
            <a
              href="https://wa.me/2348037925030"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-500 font-semibold hover:underline"
            >
              08037925030
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}