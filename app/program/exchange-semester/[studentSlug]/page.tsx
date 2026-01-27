import { getSiteContent } from "@/content/site-content";
import { getLocale } from "@/lib/server-locale";
import { buildMetadata, formatSlugTitle } from "@/lib/seo";

import PageContent from "./page-content";

type PageProps = {
  params: Promise<{ studentSlug: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const locale = await getLocale();
  const page = getSiteContent(locale).subpages.studentLife.exchange;
  const studentName = formatSlugTitle((await params).studentSlug);

  return buildMetadata(`${studentName} Exchange Story`, page.description);
}

export default async function ExchangeStoryPage({ params }: PageProps) {
  return <PageContent params={await params} />;
}
