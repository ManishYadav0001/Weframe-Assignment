// app/ui/search-with-filters.tsx
'use client';

import * as React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, SlidersHorizontal } from 'lucide-react';

export interface SearchWithFiltersProps {
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  onFiltersClick?: () => void;
  className?: string;
}

export function SearchWithFilters({
  value,
  placeholder = 'Search here..',
  onChange,
  onFiltersClick,
  className,
}: SearchWithFiltersProps) {
  return (
    <div className={`  mx-4 p-4  flex items-center justify-between gap-4 w-full ${className ?? ''}`}>
      {/* Search box */}
      <div className="relative w-full max-w-[360px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" aria-hidden="true" />
        <Input
          type="search"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          className="pl-9 h-10 rounded-xl border-gray-200 shadow-sm text-gray-900 placeholder:text-gray-400
                     focus-visible:ring-2 focus-visible:ring-blue-500/20 focus-visible:ring-offset-0"
          aria-label="Search"
        />
      </div>

      {/* Filters button */}
      <Button
        type="button"
        variant="outline"
        onClick={onFiltersClick}
        className="h-10 mr-10  rounded-xl border-gray-200 shadow-sm px-3 gap-2"
        aria-label="Open filters"
      >
        <SlidersHorizontal className="size-4" aria-hidden="true" />
        Filters
      </Button>
    </div>
  );
}

export default SearchWithFilters;
