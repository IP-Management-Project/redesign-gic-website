import { ReactNode } from "react";
import { Card } from "@heroui/card";
import { Skeleton } from "@heroui/skeleton";
import { cn } from "@heroui/theme"; // or "clsx" / "tailwind-merge"

export interface StatItem {
  label: string;
  value: string | number;
  icon: ReactNode;
  colorClass?: string; 
}

interface StatsGridProps {
  items: StatItem[];
  isLoading?: boolean;
  className?: string;
  columns?: 2 | 3 | 4;
}

export function StatsGrid({ 
  items, 
  isLoading = false, 
  className,
  columns = 3 
}: StatsGridProps) {

  // Map column props to tailwind classes
  const gridCols = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-3",
    4: "sm:grid-cols-4",
  };

  return (
    <div className={cn("grid grid-cols-1 gap-4", gridCols[columns], className)}>
      {items.map((item, i) => (
        <Card 
          key={i} 
          shadow="sm" 
          className="border-none bg-content1/50 backdrop-blur-md"
        >
          <div className="p-5 flex items-center gap-4">
            {/* Icon Wrapper */}
            <div className={cn("p-3 rounded-xl shrink-0", item.colorClass || "bg-default/10")}>
              {item.icon}
            </div>
            
            {/* Text Content */}
            <div className="w-full">
              <p className="text-tiny uppercase font-bold text-default-400 tracking-wider">
                {item.label}
              </p>
              
              {isLoading ? (
                <Skeleton className="h-8 w-16 rounded-lg mt-1" />
              ) : (
                <p className="text-2xl font-black text-foreground">
                  {item.value}
                </p>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}