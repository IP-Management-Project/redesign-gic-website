import { ReactNode } from "react";
import { cn } from "@heroui/theme";

interface PageHeaderProps {
  title: string;
  titleHighlight?: string;
  description?: string;
  children?: ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  titleHighlight,
  description,
  children,
  className
}: PageHeaderProps) {
  return (
    <div className={cn("flex flex-col md:flex-row md:items-center justify-between gap-6", className)}>
      <div className="space-y-1">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
          {title}
          {titleHighlight && (
            <span className="text-primary ml-2">{titleHighlight}</span>
          )}
        </h1>
        {description && (
          <p className="text-default-500 text-medium max-w-2xl">
            {description}
          </p>
        )}
      </div>

      {/* Action Slot */}
      {children && (
        <div className="flex items-center gap-3 shrink-0">
          {children}
        </div>
      )}
    </div>
  );
}