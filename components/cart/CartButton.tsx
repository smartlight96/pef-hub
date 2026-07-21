// components/cart/CartButton.tsx
'use client';

import { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatCurrency } from '@/lib/currency';
import CartDrawer from '@/components/cart/CartDrawer';

export default function CartButton() {
  const { totalItems, totalAmount } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Don't render until mounted (client-side only)
  if (!isMounted) {
    return null;
  }

  if (totalItems === 0) return null;

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button 
          onClick={() => setCartOpen(true)}
          className="group flex items-center gap-3.5 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 p-4 text-white shadow-xl shadow-orange-500/20 border border-orange-400/20 transition-all duration-300 hover:scale-105 hover:shadow-orange-500/30 active:scale-95 focus:outline-none"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 shadow-inner transition-transform duration-300 group-hover:-rotate-6">
            <ShoppingCart size={20} className="text-white" />
          </div>
          <div className="text-left pr-1">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-orange-100/90 leading-none mb-1">
              {totalItems} {totalItems === 1 ? 'item' : 'items'}
            </span>
            <span className="block text-base font-black tracking-tight leading-none">
              {formatCurrency(totalAmount)}
            </span>
          </div>
        </button>
      </div>

      <CartDrawer 
        isOpen={cartOpen} 
        onClose={() => setCartOpen(false)} 
      />
    </>
  );
}