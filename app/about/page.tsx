import type { Metadata } from "next";

import PageContent from "./page-content";

const title = "Mission & Vision | GIC ICT Cambodia";
const description =
  "Explore the GIC Mission & Vision, highlighting ICT education, research, and leadership driving Cambodia’s digital transformation and talent development.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function MissionVisionPage() {
  return <PageContent />;
}
