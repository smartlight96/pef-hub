'use client';

import { useState } from 'react';
import { Utensils } from 'lucide-react';
import { menuItems } from '@/data/menu';

export default function MenuBar() {
  const categories = Array.from(new Set(menuItems.map((item) => item.category)));
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const filteredItems = menuItems.filter(
    (item) => item.category === selectedCategory
  );

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="mb-12 flex flex-col items-center text-center">
        <span className="mb-2 text-xs font-bold uppercase tracking-widest text-orange-500">
          Our Offerings
        </span>
        <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Browse Our Quick Menu
        </h2>
        <div className="mt-2 h-1 w-12 rounded-full bg-orange-500" />
      </div>

      {/* Category Tabs (Scrollable on Mobile) */}
      <div className="mb-12 flex justify-center">
        <div className="no-scrollbar flex max-w-full gap-1.5 overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-900/50 p-1.5 backdrop-blur-md">
          {categories.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap rounded-xl px-5 py-2.5 text-xs font-semibold tracking-wide transition-all duration-300 sm:text-sm ${
                  isActive
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/20'
                    : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-white'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/40 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-700 hover:bg-zinc-900/80 hover:shadow-xl hover:shadow-black/40"
          >
            {/* Image Container */}
            <div className="relative aspect-square w-full overflow-hidden bg-zinc-950">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-zinc-600">
                  <Utensils size={32} strokeWidth={1.5} />
                </div>
              )}
              {/* Subtle Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>

            {/* Content Container */}
            <div className="flex flex-1 flex-col p-5">
              <span className="mb-1 text-[10px] font-medium uppercase tracking-wider text-zinc-500">
                {item.category}
              </span>
              <h3 className="font-semibold text-zinc-100 transition-colors group-hover:text-white line-clamp-1">
                {item.name}
              </h3>
              
              {/* Price Tag & CTA Space */}
              <div className="mt-4 flex items-center justify-between border-t border-zinc-800/60 pt-4">
                <span className="text-base font-bold bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                  ₦{item.price.toLocaleString()}
                </span>
                
                {/* Subtle Interactive Arrow indicator */}
                <span className="rounded-lg bg-zinc-800/50 p-1.5 text-zinc-400 transition-colors group-hover:bg-orange-500 group-hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}