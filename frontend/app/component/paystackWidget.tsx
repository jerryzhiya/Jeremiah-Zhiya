'use client';

import { useState, useEffect } from 'react';
import { CheckCircle2, CreditCard, ShieldCheck } from 'lucide-react';

// Declare global window type for PaystackPopup
declare global {
  interface Window {
    PaystackPop?: {
      setup: (options: {
        key: string;
        email: string;
        amount: number;
        ref: string;
        metadata?: Record<string, any>;
        callback: (response: { reference: string }) => void;
        onClose: () => void;
      }) => {
        openIframe: () => void;
      };
    };
  }
}

export default function PaystackWidget() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectName: '',
    amount: '',
  });

  const [isPaid, setIsPaid] = useState(false);
  const [reference, setReference] = useState('');
  const [scriptLoaded, setScriptLoaded] = useState(false);

  // Dynamically load Paystack script on client side safely
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;
    script.onload = () => setScriptLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.projectName || !formData.amount) {
      alert('Please fill in all payment details.');
      return;
    }

    if (!scriptLoaded || !window.PaystackPop) {
      alert('Paystack script is still loading. Please try again in a second.');
      return;
    }

    const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || '';
    if (!publicKey) {
      alert('Paystack Public Key is missing from your environment variables.');
      return;
    }

    const handler = window.PaystackPop.setup({
      key: publicKey,
      email: formData.email,
      amount: Number(formData.amount) * 100, // Amount in kobo/lowest currency unit
      ref: `gt_${Date.now()}`,
      metadata: {
        custom_fields: [
          {
            display_name: 'Client Name',
            variable_name: 'client_name',
            value: formData.name,
          },
          {
            display_name: 'Project Name',
            variable_name: 'project_name',
            value: formData.projectName,
          },
        ],
      },
      callback: function (response) {
        setIsPaid(true);
        setReference(response.reference);
      },
      onClose: function () {
        // Handle window closure if needed
      },
    });

    handler.openIframe();
  };

  return (
    <div className="mb-20 sm:mb-28 bg-[#dbe3d8] dark:bg-[#1a231e] rounded-3xl p-6 sm:p-10 border border-[#c8d4c4] dark:border-[#2f3e36] shadow-sm max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-xs font-semibold text-[#355843] dark:text-[#63a375] uppercase tracking-wider block mb-1">
            GlitterTech Client Portal
          </span>
          <h2 className="text-2xl font-serif font-bold text-[#1c2420] dark:text-[#e5e9e3]">
            Project Payment & Deposit
          </h2>
          <p className="text-xs text-[#52635a] dark:text-[#a3b3a9] mt-1">
            Secure international & local payment processing via Paystack.
          </p>
        </div>
        <ShieldCheck className="w-8 h-8 text-[#355843] dark:text-[#63a375]" />
      </div>

      {isPaid ? (
        <div className="text-center py-10 space-y-4">
          <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto" />
          <h3 className="text-xl font-bold text-[#1c2420] dark:text-white">Payment Successful!</h3>
          <p className="text-sm text-[#52635a] dark:text-[#a3b3a9]">
            Thank you, {formData.name}. Your payment for <strong className="text-[#1c2420] dark:text-white">{formData.projectName}</strong> has been successfully received.
          </p>
          <p className="text-xs opacity-70 font-mono">Reference ID: {reference}</p>
          <button
            onClick={() => {
              setIsPaid(false);
              setFormData({ name: '', email: '', projectName: '', amount: '' });
            }}
            className="mt-4 px-6 py-2.5 bg-[#355843] text-white text-xs font-semibold rounded-xl"
          >
            Make Another Payment
          </button>
        </div>
      ) : (
        <form onSubmit={handlePaymentSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#1e2723] dark:text-[#e5e9e3] mb-1">Your Full Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Doe"
                className="w-full p-3 rounded-xl border border-[#cbd4c9] dark:border-[#2f3e36] bg-white dark:bg-[#243029] text-sm text-[#1e2723] dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#1e2723] dark:text-[#e5e9e3] mb-1">Email Address</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john@example.com"
                className="w-full p-3 rounded-xl border border-[#cbd4c9] dark:border-[#2f3e36] bg-white dark:bg-[#243029] text-sm text-[#1e2723] dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#1e2723] dark:text-[#e5e9e3] mb-1">Project Name / Description</label>
              <input
                type="text"
                required
                value={formData.projectName}
                onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                placeholder="e.g. Full-Stack Dashboard"
                className="w-full p-3 rounded-xl border border-[#cbd4c9] dark:border-[#2f3e36] bg-white dark:bg-[#243029] text-sm text-[#1e2723] dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#1e2723] dark:text-[#e5e9e3] mb-1">Amount (NGN)</label>
              <input
                type="number"
                required
                min="100"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                placeholder="50000"
                className="w-full p-3 rounded-xl border border-[#cbd4c9] dark:border-[#2f3e36] bg-white dark:bg-[#243029] text-sm text-[#1e2723] dark:text-white"
              />
            </div>
          </div>

          <p className="text-[11px] text-[#52635a] dark:text-[#a3b3a9]">
            Accepts international cards (Visa, Mastercard, Amex) and local bank payments securely.
          </p>

          <button
            type="submit"
            className="w-full py-3.5 bg-[#355843] hover:bg-[#2a4735] text-white font-semibold rounded-xl transition flex items-center justify-center gap-2 text-sm shadow-md mt-2"
          >
            <CreditCard className="w-4 h-4" /> Pay Now Securely
          </button>
        </form>
      )}
    </div>
  );
}