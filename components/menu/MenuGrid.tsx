'use client';

import { useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
import FoodCard from './FoodCard';
import { menuItems } from '@/data/menu';

export default function MenuGrid() {
  // Get unique categories
  const categories = [
    ...Array.from(new Set(menuItems.map((item) => item.category))),
  ];

  // Multi-select state - array of selected categories
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [search, setSearch] = useState('');

  // Toggle category selection
  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedCategories([]);
    setSearch('');
  };

  // Filter logic
  const filtered = useMemo(() => {
    return menuItems.filter((item) => {
      // Category filter - if no categories selected, show all
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(item.category);

      // Search filter
      const keyword = search.toLowerCase().trim();
      const matchesSearch =
        keyword === '' ||
        item.name.toLowerCase().includes(keyword) ||
        item.category.toLowerCase().includes(keyword) ||
        item.description?.toLowerCase().includes(keyword);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategories, search]);

  // Check if any filters are active
  const hasActiveFilters = selectedCategories.length > 0 || search.length > 0;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-16">
      {/* Heading */}
      <div className="mb-8 sm:mb-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white">
          Our <span className="text-orange-500">Menu</span>
        </h2>
        <p className="text-zinc-400 mt-2 sm:mt-3 max-w-2xl text-sm sm:text-base">
          Explore our freshly prepared meals, delicious snacks, and refreshing drinks.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
          size={18}
        />
        <input
          type="text"
          placeholder="Search menu..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full
            rounded-2xl
            border
            border-zinc-800
            bg-zinc-900/80
            py-3 sm:py-4
            pl-10 sm:pl-12
            pr-10 sm:pr-12
            outline-none
            transition-all
            duration-300
            text-sm sm:text-base
            text-white
            placeholder:text-zinc-500
            focus:border-orange-500
            focus:ring-2
            focus:ring-orange-500/30
          "
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Category Filters - Multi-select */}
      <div className="flex flex-wrap gap-2 sm:gap-3 mb-6">
        {categories.map((category) => {
          const isSelected = selectedCategories.includes(category);
          
          return (
            <button
              key={category}
              onClick={() => toggleCategory(category)}
              className={`
                px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium
                transition-all duration-200
                ${isSelected 
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25' 
                  : 'bg-zinc-900/80 border border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:border-zinc-500'
                }
                hover:scale-105 active:scale-95
              `}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Active Filters & Results */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="text-sm text-zinc-400">
          <span className="font-bold text-white">{filtered.length}</span> items found
          {selectedCategories.length > 0 && (
            <span className="ml-1">
              in <span className="text-orange-400">{selectedCategories.join(', ')}</span>
            </span>
          )}
        </div>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-zinc-500 hover:text-orange-400 transition-colors duration-200"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Menu Grid */}
      {filtered.length > 0 ? (
        <div className="grid gap-4 sm:gap-6 lg:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <FoodCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 py-16 sm:py-20 text-center">
          <p className="text-zinc-400">No items found matching your filters.</p>
          <button
            onClick={clearFilters}
            className="mt-4 text-orange-500 hover:text-orange-400 transition-colors"
          >
            Clear filters
          </button>
        </div>
      )}
    </section>
  );
}