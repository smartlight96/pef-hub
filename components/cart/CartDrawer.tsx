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
  Utensils,
  AlertCircle,
  CheckSquare,
  Square,
  Trash2 as TrashIcon
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
    removeFromCart,
    clearCart
  } = useCart();
  
  const [isVisible, setIsVisible] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
    } else {
      setIsVisible(false);
      document.body.style.overflow = 'unset';
      setSelectedItems([]); // Clear selection when closing
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const handleClearCart = () => {
    if (cart.length === 0) return;
    setShowClearConfirm(true);
  };

  const confirmClearCart = () => {
    clearCart();
    setShowClearConfirm(false);
    setSelectedItems([]);
  };

  // Toggle selection for a single item
  const toggleItemSelection = (itemId: number) => {
    setSelectedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  // Select all items
  const selectAllItems = () => {
    if (selectedItems.length === cart.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cart.map(item => item.id));
    }
  };

  // Delete selected items
  const deleteSelectedItems = () => {
    if (selectedItems.length === 0) return;
    
    // Show confirmation for multiple items
    if (selectedItems.length > 1) {
      if (confirm(`Remove ${selectedItems.length} items from cart?`)) {
        selectedItems.forEach(id => removeFromCart(id));
        setSelectedItems([]);
      }
    } else {
      // For single item, just remove it
      selectedItems.forEach(id => removeFromCart(id));
      setSelectedItems([]);
    }
  };

  // Calculate selected total
  const getSelectedTotal = () => {
    return cart
      .filter(item => selectedItems.includes(item.id))
      .reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const isAllSelected = cart.length > 0 && selectedItems.length === cart.length;
  const selectedCount = selectedItems.length;
  const selectedTotal = getSelectedTotal();

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
          <div className="flex items-center gap-1.5">
            {/* Select All Button */}
            {cart.length > 0 && (
              <button
                onClick={selectAllItems}
                className="p-1.5 rounded-lg hover:bg-zinc-800 transition-colors duration-200 text-zinc-400 hover:text-white"
                aria-label={isAllSelected ? "Deselect all" : "Select all"}
                title={isAllSelected ? "Deselect all" : "Select all"}
              >
                {isAllSelected ? (
                  <CheckSquare className="w-4 h-4 text-orange-500" />
                ) : (
                  <Square className="w-4 h-4" />
                )}
              </button>
            )}
            
            {/* Delete Selected Button */}
            {selectedItems.length > 0 && (
              <button
                onClick={deleteSelectedItems}
                className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 transition-colors duration-200 text-red-400 hover:text-red-300"
                aria-label="Delete selected items"
                title={`Delete ${selectedItems.length} selected item(s)`}
              >
                <TrashIcon className="w-4 h-4" />
                <span className="ml-1 text-[10px] font-semibold">{selectedItems.length}</span>
              </button>
            )}

            {/* Clear All Button */}
            {cart.length > 0 && (
              <button
                onClick={handleClearCart}
                className="p-1.5 rounded-lg hover:bg-red-500/10 transition-colors duration-200 text-zinc-400 hover:text-red-400"
                aria-label="Clear all items"
                title="Clear all items"
              >
                <Trash2 size={15} />
              </button>
            )}
            
            <button
              onClick={handleClose}
              className="p-1.5 rounded-lg hover:bg-zinc-800 transition-colors duration-200"
              aria-label="Close cart"
            >
              <X className="w-4 h-4 text-zinc-400 hover:text-white transition-colors" />
            </button>
          </div>
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
            cart.map((item) => {
              const isSelected = selectedItems.includes(item.id);
              
              return (
                <div
                  key={item.id}
                  className={`flex items-center gap-3 rounded-xl border p-3 transition-all group ${
                    isSelected 
                      ? 'bg-orange-500/10 border-orange-500/40' 
                      : 'bg-zinc-900/60 border-zinc-800/50 hover:border-orange-500/20'
                  }`}
                >
                  {/* Selection Checkbox */}
                  <button
                    onClick={() => toggleItemSelection(item.id)}
                    className="flex-shrink-0 p-0.5 rounded hover:bg-zinc-800/50 transition-colors"
                  >
                    {isSelected ? (
                      <CheckSquare className="w-4 h-4 text-orange-500" />
                    ) : (
                      <Square className="w-4 h-4 text-zinc-500" />
                    )}
                  </button>

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

                  {/* Always Visible Delete Button */}
                  <button
                    onClick={() => {
                      removeFromCart(item.id);
                      setSelectedItems(prev => prev.filter(id => id !== item.id));
                    }}
                    className="p-1 rounded-md hover:bg-red-500/10 transition-all duration-200 active:scale-95 text-red-400 hover:text-red-300"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Selection Summary */}
        {selectedItems.length > 0 && (
          <div className="border-t border-orange-500/20 px-5 py-3 bg-orange-500/5">
            <div className="flex items-center justify-between text-sm">
              <div>
                <span className="text-zinc-400">
                  {selectedItems.length} item{selectedItems.length > 1 ? 's' : ''} selected
                </span>
                <span className="text-orange-500 ml-2 font-semibold">
                  {formatCurrency(selectedTotal)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedItems([])}
                  className="text-xs text-zinc-500 hover:text-white transition-colors"
                >
                  Clear Selection
                </button>
                <button
                  onClick={deleteSelectedItems}
                  className="text-xs bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 px-3 py-1 rounded-lg transition-colors"
                >
                  Delete Selected
                </button>
              </div>
            </div>
          </div>
        )}

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
                href="/place-order"
                onClick={handleClose}
                className="flex items-center gap-1.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 px-4 py-2.5 rounded-lg font-bold text-sm text-white transition-all hover:scale-105 active:scale-95 shadow-lg shadow-orange-500/25"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Place Order
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Clear Cart Confirmation Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6 max-w-sm w-full mx-4 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-full bg-red-500/10">
                <AlertCircle className="w-5 h-5 text-red-400" />
              </div>
              <h3 className="text-lg font-bold text-white">Clear All Items?</h3>
            </div>
            <p className="text-sm text-zinc-400 mb-6">
              This will remove all items from your cart. This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="flex-1 px-4 py-2 rounded-lg border border-zinc-700 text-zinc-300 hover:bg-zinc-800 transition-colors text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={confirmClearCart}
                className="flex-1 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors text-sm font-medium"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}

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