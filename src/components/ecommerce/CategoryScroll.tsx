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
    <div className="w-full overflow-x-auto scrollbar-hide py-3">
      <div className="flex gap-2.5 px-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            className={cn(
              "whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 border",
              selected === cat
                ? "bg-marifer-primary text-white border-marifer-primary shadow-md shadow-marifer-primary/20"
                : "bg-white text-marifer-dark border-marifer-primary/10 hover:bg-marifer-bg"
            )}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};
