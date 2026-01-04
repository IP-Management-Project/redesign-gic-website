"use client";

import { cn } from '@/utils/cn';

interface PaginationDotsProps {
  total: number;
  current: number;
  className?: string;
  onSelect?: (index: number) => void;
}

export function PaginationDots({
  total,
  current,
  className,
  onSelect
}: PaginationDotsProps) {
  return (
    <div className={cn('flex gap-2 justify-center', className)}>
      {Array.from({ length: total }).map((_, index) => (
        <button
          key={index}
          className={cn(
            'w-2 h-2 rounded-full transition-colors',
            index === current
              ? 'bg-blue-600'
              : 'bg-gray-300 hover:bg-gray-400'
          )}
          type="button"
          aria-label={`Go to slide ${index + 1}`}
          aria-current={index === current}
          onClick={() => onSelect?.(index)}
        />
      ))}
    </div>
  );
}

