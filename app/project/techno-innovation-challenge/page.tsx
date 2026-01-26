import { buildMetadata } from "@/lib/seo";

import PageContent from "./page-content";

export const metadata = buildMetadata(
  "Techno Innovation Challenge",
  "Showcasing student-led innovations, prototypes, and competition highlights at GIC.",
);

export default function TechnoInnovationChallengePage() {
  return <PageContent />;
}
