// app/checkout/page.tsx
'use client';

import Navbar from '@/components/layout/Navbar';
import CheckoutForm from '@/components/checkout/CheckoutForm';
import Footer from '@/components/layout/Footer';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-zinc-950 text-white">
        <div className="max-w-4xl mx-auto px-6 pt-8">
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-orange-500 transition-colors duration-300 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
            <span>Back to Menu</span>
          </Link>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-8">
          <span className="text-orange-500 font-semibold tracking-wider uppercase text-sm">Checkout</span>
          <h1 className="text-4xl font-black mt-2">Complete Your Order</h1>
          <p className="text-zinc-400 mt-3">Fill in your details and send your order directly to PEFF.</p>
        </div>

        <div className="max-w-4xl mx-auto px-6 pb-24">
          <CheckoutForm /> {/* ✅ Now only one payment section */}
        </div>
      </main>
      <Footer />
    </>
  );
}