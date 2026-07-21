'use client';

import Image from 'next/image';
import { Minus, Plus, Trash2, Utensils, CheckSquare, Square } from 'lucide-react';
import { CartItem as CartItemType } from '@/context/CartContext';
import { formatCurrency } from '@/lib/currency';
import { useCart } from '@/context/CartContext';

type CartItemProps = {
  item: CartItemType;
  isSelected?: boolean;
  onSelect?: (id: number) => void;
};

export default function CartItem({ 
  item, 
  isSelected = false, 
  onSelect 
}: CartItemProps) {
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

  return (
    <div 
      className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 group ${
        isSelected 
          ? 'bg-orange-500/10 border-orange-500/40' 
          : 'bg-zinc-900/60 border-zinc-800/60 hover:border-orange-500/20'
      }`}
    >
      {/* Selection Checkbox */}
      {onSelect && (
        <button
          onClick={() => onSelect(item.id)}
          className="flex-shrink-0 p-0.5 rounded hover:bg-zinc-800/50 transition-colors"
          aria-label={isSelected ? "Deselect item" : "Select item"}
        >
          {isSelected ? (
            <CheckSquare className="w-4 h-4 text-orange-500" />
          ) : (
            <Square className="w-4 h-4 text-zinc-500" />
          )}
        </button>
      )}

      {/* Image */}
      <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-zinc-800">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-zinc-950 text-zinc-500">
            <Utensils size={16} />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-sm text-white truncate group-hover:text-orange-400 transition-colors duration-200">
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
          className="w-6 h-6 rounded-md hover:bg-zinc-700 flex items-center justify-center transition-all duration-200 active:scale-95"
          aria-label="Decrease quantity"
        >
          <Minus size={12} className="text-zinc-400 hover:text-white transition-colors" />
        </button>

        <span className="w-5 text-center font-bold text-white text-xs">
          {item.quantity}
        </span>

        <button
          onClick={() => increaseQuantity(item.id)}
          className="w-6 h-6 rounded-md hover:bg-zinc-700 flex items-center justify-center transition-all duration-200 active:scale-95"
          aria-label="Increase quantity"
        >
          <Plus size={12} className="text-zinc-400 hover:text-white transition-colors" />
        </button>
      </div>

      {/* Remove Button - Always Visible */}
      <button
        onClick={() => removeFromCart(item.id)}
        className="w-6 h-6 rounded-md hover:bg-red-500/10 flex items-center justify-center transition-all duration-200 active:scale-95 text-red-400 hover:text-red-300"
        aria-label="Remove item"
      >
        <Trash2 size={13} />
      </button>
    </div>
  );
}