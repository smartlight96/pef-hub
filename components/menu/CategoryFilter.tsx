'use client';

type Props = {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
};

export default function CategoryFilter({
  categories,
  selected,
  onSelect,
}: Props) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-4">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={`px-5 py-3 rounded-xl whitespace-nowrap transition ${
            selected === category
              ? 'bg-orange-500 text-white'
              : 'bg-zinc-900 border border-zinc-800'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
