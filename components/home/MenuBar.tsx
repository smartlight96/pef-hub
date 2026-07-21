'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Utensils, Plus, Star, Clock } from 'lucide-react';
import { menuItems } from '@/data/menu';

export default function MenuBar() {
  const categories = ['All', ...Array.from(new Set(menuItems.map((item) => item.category)))];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredItems = selectedCategory === 'All'
    ? menuItems
    : menuItems.filter((item) => item.category === selectedCategory);

  // Get category count
  const getCategoryCount = (category: string) => {
    if (category === 'All') return menuItems.length;
    return menuItems.filter((item) => item.category === category).length;
  };

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
      {/* Header Section */}
      <div className="mb-10 sm:mb-12 flex flex-col items-center text-center">
        <span className="mb-2 text-xs font-bold uppercase tracking-widest text-orange-500 flex items-center gap-2">
          <span className="w-8 h-px bg-orange-500/50" />
          Our Offerings
          <span className="w-8 h-px bg-orange-500/50" />
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
          Browse Our <span className="text-orange-500">Quick Menu</span>
        </h2>
        <p className="mt-2 text-sm text-zinc-400 max-w-2xl">
          Explore our delicious meals, freshly prepared with premium ingredients
        </p>
      </div>

      {/* Category Tabs */}
      <div className="mb-10 flex justify-center">
        <div className="no-scrollbar flex max-w-full gap-1 overflow-x-auto rounded-2xl border border-zinc-800/60 bg-zinc-900/30 p-1 backdrop-blur-sm shadow-lg shadow-black/10">
          {categories.map((category) => {
            const isActive = selectedCategory === category;
            const count = getCategoryCount(category);
            
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`relative whitespace-nowrap rounded-xl px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/25'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                }`}
              >
                <span className="flex items-center gap-1.5 sm:gap-2">
                  {category}
                  <span className={`text-[10px] font-medium ${
                    isActive ? 'text-orange-200' : 'text-zinc-500'
                  }`}>
                    ({count})
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Items Grid */}
      {filteredItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-zinc-500">
          <Utensils size={48} className="mb-4 text-zinc-600" />
          <p className="text-lg font-semibold text-zinc-400">No items found</p>
          <p className="text-sm text-zinc-600 mt-1">Try selecting a different category</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {filteredItems.map((item) => (
            <Link
              key={item.id}
              href={`/menu/${item.id}`}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-800/60 bg-zinc-900/30 transition-all duration-300 hover:-translate-y-2 hover:border-orange-500/30 hover:bg-zinc-900/60 hover:shadow-2xl hover:shadow-orange-500/5"
            >
              {/* Image Container */}
              <div className="relative aspect-square w-full overflow-hidden bg-zinc-950">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-zinc-600">
                    <Utensils size={32} strokeWidth={1.5} />
                  </div>
                )}
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                
                {/* Category Badge */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-sm border border-white/10 text-[10px] font-medium text-zinc-300">
                  {item.category}
                </div>

                {/* Quick Add Button */}
                <button 
                  className="absolute bottom-3 right-3 p-2 rounded-xl bg-orange-500/90 backdrop-blur-sm text-white shadow-lg shadow-orange-500/20 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 active:scale-95"
                  onClick={(e) => {
                    e.preventDefault();
                    // Add to cart logic here
                  }}
                >
                  <Plus size={16} />
                </button>
              </div>

              {/* Content Container */}
              <div className="flex flex-1 flex-col p-4 sm:p-5">
                <h3 className="font-semibold text-sm sm:text-base text-white transition-colors group-hover:text-orange-400 line-clamp-1">
                  {item.name}
                </h3>
                
                <p className="mt-1 text-xs text-zinc-500 line-clamp-2 min-h-[32px]">
                  {item.description}
                </p>
                
                {/* Price & Rating */}
                <div className="mt-3 flex items-center justify-between border-t border-zinc-800/50 pt-3">
                  <div>
                    <span className="text-xs text-zinc-500">Price</span>
                    <p className="text-base font-bold text-orange-500">
                      ₦{item.price.toLocaleString()}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-1 text-xs text-zinc-400">
                    <Star className="w-3 h-3 fill-orange-500 text-orange-500" />
                    <span>4.8</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* View All Menu Button */}
      <div className="mt-12 text-center">
        <Link
          href="/menu"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-zinc-700/50 text-zinc-300 hover:text-white hover:border-orange-500/50 hover:bg-zinc-800/50 transition-all duration-300 text-sm font-medium"
        >
          View Full Menu
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      </div>
    </section>
  );
}