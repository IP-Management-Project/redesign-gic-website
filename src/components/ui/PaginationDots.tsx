import { cn } from '@/utils/cn';

interface PaginationDotsProps {
  total: number;
  current: number;
  className?: string;
}

export function PaginationDots({
  total,
  current,
  className
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
          aria-label={`Go to page ${index + 1}`}
        />
      ))}
    </div>
  );
}

