
"use client";

import React from 'react';
import { Category } from '@/types';
import { cn } from '@/lib/utils';

const categories: Category[] = [
  'Todos',
  'Pantalones',
  'Buzos Oversize',
  'Remeras',
  'Pijamas Polar Soft'
];

interface CategoryScrollProps {
  selected: Category;
  onSelect: (category: Category) => void;
}

export const CategoryScroll = ({ selected, onSelect }: CategoryScrollProps) => {
  return (
    <div className="w-full overflow-x-auto scrollbar-hide py-4">
      <div className="flex gap-3 px-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            className={cn(
              "whitespace-nowrap px-6 py-2 rounded-full text-sm font-semibold transition-all shadow-sm border",
              selected === cat
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-white text-foreground border-border hover:bg-secondary"
            )}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};
