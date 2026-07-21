'use client';

import { useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
import FoodCard from './FoodCard';
import { menuItems } from '@/data/menu';

export default function MenuGrid() {
  const categories = [
    'All',
    ...Array.from(new Set(menuItems.map((item) => item.category))),
  ];

  const [selected, setSelected] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesCategory =
        selected === 'All' || item.category === selected;

      const keyword = search.toLowerCase().trim();

      const matchesSearch =
        keyword === '' ||
        item.name.toLowerCase().includes(keyword) ||
        item.category.toLowerCase().includes(keyword) ||
        item.description?.toLowerCase().includes(keyword);

      return matchesCategory && matchesSearch;
    });
  }, [selected, search]);

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">

      {/* Heading */}
      <div className="mb-10">
        <h2 className="text-4xl md:text-5xl font-black">
          Our Menu
        </h2>

        <p className="text-zinc-400 mt-3 max-w-2xl">
          Explore our freshly prepared meals, delicious snacks,
          refreshing drinks, and chef specials.
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-8">

        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
          size={20}
        />

        <input
          type="text"
          placeholder="Search meals, drinks or categories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full
            rounded-2xl
            border
            border-zinc-800
            bg-zinc-900
            py-4
            pl-12
            pr-12
            outline-none
            transition
            focus:border-orange-500
            focus:ring-2
            focus:ring-orange-500/30
          "
        />

        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Categories */}
      <div className="mb-10">
        <div className="flex gap-3 overflow-x-auto no-scrollbar">

          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelected(category)}
              className={`
                px-5
                py-3
                rounded-full
                whitespace-nowrap
                transition-all
                duration-300
                font-medium

                ${
                  selected === category
                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20'
                    : 'bg-zinc-900 border border-zinc-800 hover:border-orange-500 hover:text-orange-400'
                }
              `}
            >
              {category}
            </button>
          ))}

        </div>
      </div>

      {/* Result Count */}
      <div className="mb-8 text-zinc-400">
        {filtered.length} meal{filtered.length !== 1 ? 's' : ''} found
      </div>

      {/* Cards */}
      {filtered.length > 0 ? (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <FoodCard
              key={item.id}
              item={item}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900 py-20 text-center">

          <h3 className="text-2xl font-bold">
            No meals found
          </h3>

          <p className="text-zinc-400 mt-3">
            Try another keyword or choose a different category.
          </p>

          <button
            onClick={() => {
              setSearch('');
              setSelected('All');
            }}
            className="mt-6 rounded-xl bg-orange-500 px-6 py-3 font-semibold hover:bg-orange-600 transition"
          >
            Reset Filters
          </button>

        </div>
      )}
    </section>
  );
}