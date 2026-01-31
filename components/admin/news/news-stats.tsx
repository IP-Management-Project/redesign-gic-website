import { Card } from "@heroui/card";
import { Skeleton } from "@heroui/skeleton";
import { CheckCircle2, FileEdit, Newspaper } from "lucide-react";

export function NewsStats({ stats, isLoading }: { stats: any, isLoading: boolean }) {
  const items = [
    { label: "Total Articles", val: stats.total, icon: <Newspaper className="text-blue-500" />, bg: "bg-blue-500/10" },
    { label: "Live Now", val: stats.published, icon: <CheckCircle2 className="text-green-500" />, bg: "bg-green-500/10" },
    { label: "In Draft", val: stats.unpublished, icon: <FileEdit className="text-amber-500" />, bg: "bg-amber-500/10" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {items.map((s, i) => (
        <Card key={i} shadow="sm" className="border-none bg-content1/50 backdrop-blur-md">
          <div className="p-5 flex items-center gap-4">
            <div className={`p-3 rounded-xl ${s.bg}`}>{s.icon}</div>
            <div className="w-full">
              <p className="text-tiny uppercase font-bold text-default-400 tracking-wider">{s.label}</p>
              {isLoading ? (
                <Skeleton className="h-8 w-16 rounded-lg mt-1" />
              ) : (
                <p className="text-2xl font-black">{s.val}</p>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

