'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

type Props = {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
  showAllOption?: boolean;
  allLabel?: string;
};

export default function CategoryFilter({
  categories,
  selected,
  onSelect,
  showAllOption = true,
  allLabel = 'All',
}: Props) {
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Category icons mapping
  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      'All': '🍽️',
      'Drinks': '🥤',
      'Pastries': '🥐',
      'Rice Dishes': '🍚',
      'Proteins': '🍗',
      'Soups & Swallows': '🍲',
      'Sides & Extras': '🥗',
      'Fast Food': '🌯',
    };
    return icons[category] || '🍽️';
  };

  // Get category color
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'All': 'from-purple-500 to-purple-600',
      'Drinks': 'from-blue-500 to-blue-600',
      'Pastries': 'from-pink-500 to-pink-600',
      'Rice Dishes': 'from-emerald-500 to-emerald-600',
      'Proteins': 'from-red-500 to-red-600',
      'Soups & Swallows': 'from-amber-500 to-amber-600',
      'Sides & Extras': 'from-cyan-500 to-cyan-600',
      'Fast Food': 'from-orange-500 to-orange-600',
    };
    return colors[category] || 'from-orange-500 to-orange-600';
  };

  const allCategories = showAllOption ? ['All', ...categories] : categories;

  // Check scroll position for arrows
  const checkScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setShowLeftArrow(container.scrollLeft > 20);
      setShowRightArrow(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 20
      );
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = container.clientWidth * 0.7;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="relative w-full">
      {/* Left Arrow */}
      {showLeftArrow && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-zinc-900/90 border border-zinc-700 text-white hover:bg-zinc-800 transition-all duration-200 hover:scale-110 shadow-lg"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      )}

      {/* Categories Container */}
      <div
        ref={scrollContainerRef}
        onScroll={checkScroll}
        className="flex gap-2 sm:gap-3 overflow-x-auto pb-4 scroll-smooth hide-scrollbar px-6"
      >
        {allCategories.map((category) => {
          const isSelected = selected === category;
          const icon = getCategoryIcon(category);
          const color = getCategoryColor(category);
          
          return (
            <button
              key={category}
              onClick={() => onSelect(category)}
              className={`
                relative flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl 
                whitespace-nowrap transition-all duration-300 
                text-sm sm:text-base font-semibold
                ${isSelected 
                  ? `bg-gradient-to-r ${color} text-white shadow-lg shadow-orange-500/25 scale-105` 
                  : 'bg-zinc-900/80 border border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:border-zinc-500 hover:text-white'
                }
                hover:scale-105 active:scale-95
              `}
            >
              {/* Selected indicator glow */}
              {isSelected && (
                <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-500/20 to-transparent blur-xl" />
              )}
              
              <span className="relative z-10 text-base sm:text-lg">{icon}</span>
              <span className="relative z-10">{category}</span>
              
              {/* Item count badge (optional - you can pass counts) */}
              {isSelected && (
                <span className="relative z-10 ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-white/20 text-[10px] font-bold text-white">
                  <Sparkles className="w-3 h-3" />
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Right Arrow */}
      {showRightArrow && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-zinc-900/90 border border-zinc-700 text-white hover:bg-zinc-800 transition-all duration-200 hover:scale-110 shadow-lg"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      )}

      {/* Gradient fades on edges */}
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-zinc-950 to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-zinc-950 to-transparent pointer-events-none" />

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}