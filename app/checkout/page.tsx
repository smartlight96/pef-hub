// app/checkout/page.tsx
'use client';

import Navbar from '@/components/layout/Navbar';
import CheckoutForm from '@/components/checkout/CheckoutForm';
import PaymentCard from '@/components/checkout/PaymentCard';
import Footer from '@/components/layout/Footer';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-zinc-950 text-white">
        {/* Back Button */}
        <div className="max-w-7xl mx-auto px-6 pt-8">
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-orange-500 transition-colors duration-300 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
            <span>Back to Menu</span>
          </Link>
        </div>

        {/* Header */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <span className="text-orange-500 font-semibold tracking-wider uppercase text-sm">Checkout</span>
          <h1 className="text-5xl font-black mt-2">Complete Your Order</h1>
          <p className="text-zinc-400 mt-3">Fill in your details and send your order directly to PEFF.</p>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 pb-24">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <CheckoutForm /> {/* No props needed! */}
            </div>
            <div>
              <PaymentCard />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}