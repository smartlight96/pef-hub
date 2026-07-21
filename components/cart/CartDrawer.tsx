// components/cart/CartDrawer.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  X, 
  Minus, 
  Plus, 
  Trash2, 
  ShoppingBag, 
  CreditCard,
  ArrowRight,
  Truck,
  ShieldCheck,
  Sparkles,
  Utensils
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatCurrency } from '@/lib/currency';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { 
    cart, 
    totalAmount, 
    totalItems, 
    increaseQuantity,
    decreaseQuantity,
    removeFromCart
  } = useCart();
  
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
    } else {
      setIsVisible(false);
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  if (!isOpen && !isVisible) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={handleClose}
      />

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 z-50 h-full w-[380px] max-w-[90vw] bg-zinc-950 shadow-2xl shadow-black/50 border-l border-zinc-800 transition-transform duration-300 ease-out ${
          isVisible ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800/60 px-5 py-4">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-gradient-to-br from-orange-500/20 to-amber-500/20">
              <Utensils className="w-4 h-4 text-orange-500" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Your Order</h2>
              <p className="text-xs text-zinc-400">
                {totalItems} {totalItems === 1 ? 'item' : 'items'}
                {totalItems > 0 && (
                  <span className="text-orange-500 ml-1">• {formatCurrency(totalAmount)}</span>
                )}
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg hover:bg-zinc-800 transition-colors duration-200"
            aria-label="Close cart"
          >
            <X className="w-4 h-4 text-zinc-400 hover:text-white transition-colors" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2 max-h-[calc(100vh-200px)] custom-scrollbar">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-zinc-500">
              <div className="p-4 rounded-full bg-zinc-900/50 mb-3">
                <ShoppingBag size={32} strokeWidth={1.5} className="text-zinc-600" />
              </div>
              <p className="text-sm font-semibold text-zinc-400">Your order is empty</p>
              <p className="text-xs text-zinc-600 mt-1">Browse our menu</p>
              <Link
                href="/menu"
                onClick={handleClose}
                className="mt-4 inline-flex items-center gap-1.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all hover:scale-105 active:scale-95 shadow-lg shadow-orange-500/25"
              >
                Browse Menu
                <ArrowRight size={14} />
              </Link>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 rounded-xl bg-zinc-900/60 border border-zinc-800/50 p-3 hover:border-orange-500/20 transition-all group"
              >
                {/* Image */}
                <div className="relative h-12 w-12 flex-shrink-0 rounded-lg overflow-hidden bg-zinc-800">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-zinc-500">
                      <Utensils size={16} />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white text-sm truncate group-hover:text-orange-400 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-sm font-bold text-orange-500">
                    {formatCurrency(item.price)}
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-0.5 bg-zinc-800/50 rounded-lg p-0.5">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="p-1 rounded-md hover:bg-zinc-700 transition-colors active:scale-95"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3 h-3 text-zinc-400 hover:text-white transition-colors" />
                  </button>
                  <span className="w-6 text-center font-bold text-white text-xs">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="p-1 rounded-md hover:bg-zinc-700 transition-colors active:scale-95"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3 h-3 text-zinc-400 hover:text-white transition-colors" />
                  </button>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-1 rounded-md hover:bg-red-500/10 transition-all opacity-0 group-hover:opacity-100 active:scale-95"
                  aria-label="Remove item"
                >
                  <Trash2 className="w-3.5 h-3.5 text-red-400 hover:text-red-300 transition-colors" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t border-zinc-800/60 px-5 py-4 bg-zinc-900/50">
            {/* Trust Badges */}
            <div className="flex items-center justify-center gap-3 mb-3 text-[10px] text-zinc-500">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-green-500" />
                Secure
              </span>
              <span className="w-px h-3 bg-zinc-700" />
              <span className="flex items-center gap-1">
                <Truck className="w-3 h-3 text-orange-500" />
                Fast
              </span>
              <span className="w-px h-3 bg-zinc-700" />
              <span className="flex items-center gap-1">
                <CreditCard className="w-3 h-3 text-orange-500" />
                Transfer
              </span>
            </div>

            {/* Total */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] text-zinc-400">Total</p>
                <p className="text-xl font-black text-white">{formatCurrency(totalAmount)}</p>
              </div>
              <Link
                href="/checkout"
                onClick={handleClose}
                className="flex items-center gap-1.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 px-4 py-2.5 rounded-lg font-bold text-sm text-white transition-all hover:scale-105 active:scale-95 shadow-lg shadow-orange-500/25"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Checkout
              </Link>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #f97316;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #ea580c;
        }
      `}</style>
    </>
  );
}