'use client';

import { useEffect, useState } from 'react';
import { menuItems, MenuItem } from '@/data/menu';
import FoodCard from '@/components/menu/FoodCard';

export default function PopularMeals() {
  const [popularMeals, setPopularMeals] = useState<MenuItem[]>([]);

  // Fisher-Yates shuffle algorithm
  const shuffleArray = (array: MenuItem[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  useEffect(() => {
    // Filter all food categories (exclude Drinks and Pastries)
    const foodItems = menuItems.filter((item) => 
      item.category !== 'Drinks' && item.category !== 'Pastries'
    );
    
    // Shuffle and get 4 random items
    const shuffled = shuffleArray(foodItems);
    const randomMeals = shuffled.slice(0, 4);
    setPopularMeals(randomMeals);
  }, []);

  // Show loading state
  if (popularMeals.length === 0) {
    return (
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black mb-4">🔥 Popular Meals</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">Loading our popular meals...</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-zinc-900/50 rounded-2xl h-72 animate-pulse" />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-black mb-4">🔥 Popular Meals</h2>
        <p className="text-zinc-400 max-w-2xl mx-auto">
          Our customers' favorite dishes, prepared fresh daily with premium ingredients.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {popularMeals.map((item) => (
          <FoodCard key={item.id} item={item} />
        ))}
      </div>

      <div className="text-center mt-12">
        <a
          href="/menu"
          className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 px-8 py-4 rounded-2xl font-semibold transition hover:scale-105 active:scale-95"
        >
          View Full Menu
        </a>
      </div>
    </section>
  );
}