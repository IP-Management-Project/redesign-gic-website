import { getSiteContent } from "@/content/site-content";
import { getLocale } from "@/lib/server-locale";
import { buildMetadata } from "@/lib/seo";

import PageContent from "./page-content";

export async function generateMetadata() {
  const locale = await getLocale();
  const page = getSiteContent(locale).subpages.research.softwareTools;

  return buildMetadata(page.title, page.description);
}

export default function SoftwareToolsPage() {
  return <PageContent />;
}
