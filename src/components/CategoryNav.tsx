import React from 'react';
import { CATEGORIES } from '../data/menu';
import { CategoryId } from '../types/cafe';

interface CategoryNavProps {
  selectedCategory: string;
  onSelectCategory: (id: CategoryId) => void;
  categoryCounts: Record<string, number>;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  selectedCategory,
  onSelectCategory,
  categoryCounts,
}) => {
  return (
    <div className="relative mb-5">
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar -mx-1 px-1">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          const count = categoryCounts[cat.id] ?? cat.count;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id as CategoryId)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-[#C05C38] to-[#D99443] text-white shadow-md shadow-[#C05C38]/20 ring-2 ring-[#C05C38]/40'
                  : 'bg-white text-[#7D6858] hover:bg-[#F5EBE1] hover:text-[#2C1D1A] border border-[#E8DCC8]'
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`text-[11px] px-2 py-0.5 rounded-full font-bold tabular-nums ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'bg-[#F5EBE1] text-[#C05C38] border border-[#E8DCC8]'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
