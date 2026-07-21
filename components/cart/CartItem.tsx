'use client';

import Image from 'next/image';
import { Minus, Plus, Trash2, Utensils } from 'lucide-react';
import { CartItem as CartItemType } from '@/context/CartContext';
import { formatCurrency } from '@/lib/currency';
import { useCart } from '@/context/CartContext';

type CartItemProps = {
  item: CartItemType;
};

export default function CartItem({ item }: CartItemProps) {
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

  return (
    <div className="flex items-center gap-4 p-4 bg-zinc-900 rounded-2xl border border-zinc-800">
      <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-zinc-950 text-zinc-500">
            <Utensils size={22} />
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-sm truncate">{item.name}</h3>
        <p className="text-orange-500 font-bold text-sm">
          {formatCurrency(item.price)}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => decreaseQuantity(item.id)}
          className="w-8 h-8 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center hover:bg-zinc-700 transition"
        >
          <Minus size={14} />
        </button>

        <span className="w-8 text-center font-semibold text-sm">
          {item.quantity}
        </span>

        <button
          onClick={() => increaseQuantity(item.id)}
          className="w-8 h-8 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center hover:bg-zinc-700 transition"
        >
          <Plus size={14} />
        </button>

        <button
          onClick={() => removeFromCart(item.id)}
          className="w-8 h-8 rounded-lg bg-red-500/20 border border-red-500/30 flex items-center justify-center hover:bg-red-500/30 transition ml-2"
        >
          <Trash2 size={14} className="text-red-400" />
        </button>
      </div>
    </div>
  );
}
