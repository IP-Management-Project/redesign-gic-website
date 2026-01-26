import { buildMetadata } from "@/lib/seo";
import { getSiteContent } from "@/content/site-content";
import { getLocale } from "@/lib/server-locale";

import PageContent from "./page-content";

export async function generateMetadata() {
  const locale = await getLocale();
  const content = getSiteContent(locale);

  return buildMetadata(content.brand.name, content.description);
}

export default function Home() {
  return <PageContent />;
}