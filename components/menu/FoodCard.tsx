'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Utensils, ShoppingCart, Star } from 'lucide-react';
import { MenuItem } from '@/data/menu';
import { formatCurrency } from '@/lib/currency';
import { useCart } from '@/context/CartContext';

type FoodCardProps = {
  item: MenuItem;
};

export default function FoodCard({ item }: FoodCardProps) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  // Generate random rating between 4.0 and 5.0
  const rating = (4 + Math.random() * 1).toFixed(1);
  const fullStars = Math.floor(Number(rating));
  const hasHalfStar = Number(rating) - fullStars >= 0.5;
  const totalStars = 5;

  const handleAddToCart = () => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
    });
    
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  // Render stars
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= totalStars; i++) {
      if (i <= fullStars) {
        // Full star
        stars.push(
          <Star key={i} className="w-4 h-4 fill-orange-500 text-orange-500" />
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        // Half star
        stars.push(
          <div key={i} className="relative">
            <Star className="w-4 h-4 text-zinc-600" />
            <div className="absolute inset-0 overflow-hidden w-1/2">
              <Star className="w-4 h-4 fill-orange-500 text-orange-500" />
            </div>
          </div>
        );
      } else {
        // Empty star
        stars.push(
          <Star key={i} className="w-4 h-4 text-zinc-600" />
        );
      }
    }
    return stars;
  };

  return (
    <div className="group overflow-hidden rounded-3xl bg-zinc-900 border border-zinc-800 hover:border-orange-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-orange-500/10">
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        {item.image ? (
          <>
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover group-hover:scale-110 transition duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            {/* Category Badge */}
            <span className="absolute top-3 left-3 px-3 py-1 bg-orange-500/90 text-white text-xs font-bold rounded-full backdrop-blur-sm">
              {item.category}
            </span>
          </>
        ) : (
          <div className="flex h-full items-center justify-center bg-zinc-950 text-zinc-500">
            <Utensils size={44} />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* 5-Star Rating */}
        <div className="flex items-center gap-1 mb-2">
          {renderStars()}
          <span className="text-sm font-bold text-white ml-2">{rating}</span>
          <span className="text-xs text-zinc-500">(128 reviews)</span>
        </div>

        <h3 className="text-xl font-bold text-white group-hover:text-orange-500 transition">
          {item.name}
        </h3>

        <p className="text-zinc-400 mt-2 text-sm line-clamp-2">
          {item.description}
        </p>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-zinc-800">
          <span className="text-2xl font-black text-orange-500">
            {formatCurrency(item.price)}
          </span>

          <button
            onClick={handleAddToCart}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold transition-all duration-300 ${
              isAdded 
                ? 'bg-emerald-500 text-white' 
                : 'bg-orange-500 hover:bg-orange-600 text-white hover:scale-105'
            } active:scale-95`}
          >
            <ShoppingCart className="w-4 h-4" />
            {isAdded ? 'Added ✓' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}