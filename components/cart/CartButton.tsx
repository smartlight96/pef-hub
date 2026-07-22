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

  // Don't render anything until mounted (client-side only)
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
          aria-label={`Open your order with ${totalItems} items`}
          className={`
            group relative flex items-center gap-3 rounded-2xl 
            bg-gradient-to-r from-orange-500 via-orange-500 to-amber-500 
            p-3 pr-5 text-white 
            shadow-2xl shadow-orange-500/40 
            border border-white/20 
            transition-all duration-500 
            hover:scale-110 hover:shadow-orange-500/60 hover:shadow-2xl
            active:scale-95 focus:outline-none
            ${isPulsing ? 'animate-[pulse_0.6s_ease-in-out]' : ''}
          `}
          style={{
            boxShadow: '0 20px 60px rgba(249, 115, 22, 0.4)',
          }}
        >
          {/* Glow Effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500 via-orange-400 to-amber-400 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10" />
          
          {/* Border Glow */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-400 to-amber-400 opacity-0 group-hover:opacity-100 blur-[2px] transition-opacity duration-500 -z-10" />

          {/* Animated Icon Container */}
          <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm shadow-inner transition-all duration-500 group-hover:scale-110 group-hover:rotate-[-8deg] group-hover:bg-white/30">
            <ShoppingCart size={22} className="text-white relative z-10 transition-transform duration-500 group-hover:scale-110" />
            
            {/* Badge - Shows item count */}
            <span className="absolute -top-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-red-600 text-[10px] font-black text-white shadow-lg shadow-red-500/40 ring-2 ring-white/30 transition-all duration-300 group-hover:scale-110 group-hover:shadow-red-500/60">
              {totalItems > 9 ? '9+' : totalItems}
            </span>
          </div>

          {/* Order Info */}
          <div className="relative text-left z-10">
            <span className="block text-[10px] font-bold uppercase tracking-[0.15em] text-orange-100/80 leading-none mb-1.5">
              {totalItems} {totalItems === 1 ? 'item' : 'items'}
            </span>
            <span className="block text-lg font-black tracking-tight leading-none bg-gradient-to-r from-white to-orange-100 bg-clip-text text-transparent">
              {formatCurrency(totalAmount)}
            </span>
          </div>

          {/* Arrow Indicator */}
          <div className="relative z-10 ml-1 flex items-center justify-center w-7 h-7 rounded-full bg-white/10 backdrop-blur-sm transition-all duration-500 group-hover:bg-white/20 group-hover:scale-110">
            <ArrowRight 
              size={14} 
              className="text-white/70 group-hover:text-white transition-all duration-500 group-hover:translate-x-1" 
            />
          </div>

          {/* Sparkle Decoration */}
          <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <Sparkles className="w-3 h-3 text-yellow-300" />
          </div>
          <div className="absolute -bottom-1 -left-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
            <Sparkles className="w-2.5 h-2.5 text-yellow-300" />
          </div>
        </button>

        {/* Floating Label - Food Themed */}
        <div className="relative mt-3 text-center">
          <div className="inline-block px-4 py-1.5 rounded-full bg-zinc-900/80 backdrop-blur-sm border border-zinc-800/50 shadow-lg">
            <span className="text-[10px] font-medium text-zinc-400 animate-pulse flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-ping" />
              🍽️ View Your Order
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