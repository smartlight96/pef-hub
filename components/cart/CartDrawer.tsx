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
  ShieldCheck
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
        className={`fixed inset-0 z-50 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={handleClose}
      />

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 z-50 h-full w-full max-w-md bg-zinc-950 shadow-2xl shadow-black/50 border-l border-zinc-800 transition-transform duration-300 ease-out ${
          isVisible ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-orange-500/10">
              <ShoppingBag className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white">Your Cart</h2>
              <p className="text-sm text-zinc-400">{totalItems} items</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-xl hover:bg-zinc-800 transition-colors duration-200"
            aria-label="Close cart"
          >
            <X className="w-5 h-5 text-zinc-400" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3 max-h-[calc(100vh-280px)]">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-zinc-500">
              <ShoppingBag size={48} strokeWidth={1.5} className="mb-4 text-zinc-600" />
              <p className="text-lg font-semibold text-zinc-400">Your cart is empty</p>
              <p className="text-sm text-zinc-600 mt-1">Browse our menu and add items</p>
              <Link
                href="/menu"
                onClick={handleClose}
                className="mt-6 inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-xl font-semibold transition"
              >
                Browse Menu
                <ArrowRight size={18} />
              </Link>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 p-4 hover:border-orange-500/30 transition-all duration-200 group"
              >
                {/* Image */}
                <div className="relative h-16 w-16 flex-shrink-0 rounded-xl overflow-hidden bg-zinc-800">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-zinc-500">
                      <ShoppingBag size={20} />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white truncate">{item.name}</h3>
                  <p className="text-sm font-bold text-orange-500">
                    {formatCurrency(item.price)}
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors active:scale-95"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5 text-zinc-400" />
                  </button>
                  <span className="w-8 text-center font-bold text-white text-sm">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors active:scale-95"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5 text-zinc-400" />
                  </button>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-1.5 rounded-lg hover:bg-red-500/10 transition-colors opacity-0 group-hover:opacity-100 active:scale-95"
                  aria-label="Remove item"
                >
                  <Trash2 className="w-4 h-4 text-red-400" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t border-zinc-800 px-6 py-5 bg-zinc-900/50">
            {/* Trust Badges */}
            <div className="flex items-center justify-center gap-4 mb-4 text-xs text-zinc-500">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
                Secure
              </span>
              <span className="w-px h-3 bg-zinc-700" />
              <span className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-orange-500" />
                Fast Delivery
              </span>
              <span className="w-px h-3 bg-zinc-700" />
              <span className="flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5 text-orange-500" />
                Bank Transfer
              </span>
            </div>

            {/* Total */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-zinc-400">Total ({totalItems} items)</p>
                <p className="text-2xl font-black text-white">{formatCurrency(totalAmount)}</p>
              </div>
              <Link
                href="/checkout"
                onClick={handleClose}
                className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 px-6 py-3 rounded-xl font-bold text-white transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-orange-500/25"
              >
                <CreditCard className="w-4 h-4" />
                Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}