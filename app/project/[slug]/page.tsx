"use client";

import { useProjectBySlug } from "@/hooks/useProject";
import { useParams } from "next/navigation";
import React from "react";

function page() {
  const { slug } = useParams<{ slug: string }>();
  const { data } = useProjectBySlug(slug as string);

  return (
    <div>
      <iframe
        srcDoc={`<style>${data?.css}</style>${data?.html}`}
        className="w-screen h-screen"
      />
    </div>
  );
}

export default page;
