"use client";

import React from "react";
import { Timeline } from "@/components/ui/timeline";
import { useTimelineEntries } from "@/hooks/useTimelineEntries";

export function TimelineDemo() {
  const { data = [] } = useTimelineEntries();
  return (
    <div className="relative w-full overflow-clip">
      <Timeline data={data} />
    </div>
  );
}
