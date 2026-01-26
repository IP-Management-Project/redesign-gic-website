import { buildMetadata } from "@/lib/seo";

import PageContent from "./page-content";

export const metadata = buildMetadata(
  "Message from the Department Head",
  "Insights, priorities, and a welcome message from the GIC department head.",
);

export default function HeadMessagePage() {
  return <PageContent />;
}
