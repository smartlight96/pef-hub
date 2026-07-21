// components/cart/CartButton.tsx
'use client';

import { useState, useEffect } from 'react';
import { ShoppingCart, ArrowRight, Sparkles, Utensils } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatCurrency } from '@/lib/currency';
import CartDrawer from '@/components/cart/CartDrawer';

export default function CartButton() {
  const { totalItems, totalAmount } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Pulse animation when items are added
  useEffect(() => {
    if (totalItems > 0) {
      setIsPulsing(true);
      const timer = setTimeout(() => setIsPulsing(false), 600);
      return () => clearTimeout(timer);
    }
  }, [totalItems]);

  // Don't render until mounted (client-side only)
  if (!isMounted) {
    return null;
  }

  if (totalItems === 0) return null;

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-6 duration-500">
        <button 
          onClick={() => setCartOpen(true)}
          aria-label={`View your order with ${totalItems} items`}
          className={`
            group relative flex items-center gap-3 rounded-2xl 
            bg-gradient-to-r from-orange-500 to-amber-500 
            p-3 pr-4 text-white 
            shadow-lg shadow-orange-500/30 
            border border-white/15 
            transition-all duration-400 
            hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/50
            active:scale-95 focus:outline-none
            ${isPulsing ? 'animate-[pulse_0.6s_ease-in-out]' : ''}
          `}
        >
          {/* Subtle Glow Effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-400 to-amber-400 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500 -z-10" />

          {/* Animated Icon Container */}
          <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm transition-all duration-400 group-hover:scale-110 group-hover:bg-white/25">
            <ShoppingCart size={20} className="text-white relative z-10 transition-transform duration-400 group-hover:scale-110" />
            
            {/* Badge - Shows item count */}
            <span className="absolute -top-1.5 -right-1.5 flex h-5.5 w-5.5 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-red-500 text-[9px] font-black text-white shadow-lg shadow-orange-500/40 ring-2 ring-white/20 transition-all duration-300 group-hover:scale-110">
              {totalItems > 9 ? '9+' : totalItems}
            </span>
          </div>

          {/* Order Info */}
          <div className="relative text-left z-10">
            <span className="block text-[9px] font-semibold uppercase tracking-[0.12em] text-orange-100/70 leading-none mb-1">
              {totalItems} {totalItems === 1 ? 'item' : 'items'}
            </span>
            <span className="block text-base font-bold tracking-tight leading-none text-white">
              {formatCurrency(totalAmount)}
            </span>
          </div>

          {/* Arrow Indicator */}
          <div className="relative z-10 ml-0.5 flex items-center justify-center w-6 h-6 rounded-full bg-white/10 backdrop-blur-sm transition-all duration-400 group-hover:bg-white/20 group-hover:scale-110">
            <ArrowRight 
              size={13} 
              className="text-white/60 group-hover:text-white transition-all duration-400 group-hover:translate-x-0.5" 
            />
          </div>
        </button>

        {/* Floating Label - Minimal */}
        <div className="relative mt-2.5 text-center">
          <div className="inline-block px-3.5 py-1 rounded-full bg-zinc-900/70 backdrop-blur-sm border border-zinc-800/40">
            <span className="text-[9px] font-medium text-zinc-400 flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-orange-500 animate-pulse" />
              View Order
            </span>
          </div>
        </div>
      </div>

      <CartDrawer 
        isOpen={cartOpen} 
        onClose={() => setCartOpen(false)} 
      />
    </>
  );
}