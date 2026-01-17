"use client";

import React from "react";
import { Timeline } from "@/components/ui/timeline";
import { useHistoryTimelineData } from "@/hooks/useHistoryTimelineData";

export default function GICHistoryTimeline() {
  const { data = [] } = useHistoryTimelineData();

  return (
    <div className="relative w-full overflow-clip bg-background">
      <div className="max-w-7xl mx-auto py-20 px-6">
        <h2 className="text-4xl md:text-7xl font-black tracking-tighter text-foreground mb-4">
          The GIC Story
        </h2>
        <p className="text-default-500 text-lg max-w-2xl font-medium">
          Two decades of pioneering engineering education, bridging Cambodia's 
          brightest talents with global innovation.
        </p>
      </div>
      <Timeline data={data} />
    </div>
  );
}
