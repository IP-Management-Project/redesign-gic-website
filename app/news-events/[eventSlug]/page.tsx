import { getSiteContent } from "@/content/site-content";
import { getLocale } from "@/lib/server-locale";
import { buildMetadata, formatSlugTitle } from "@/lib/seo";

import PageContent from "./page-content";

type PageProps = {
  params: { eventSlug: string };
};

export async function generateMetadata({ params }: PageProps) {
  const locale = await getLocale();
  const page = getSiteContent(locale).subpages.newsEvents.newsPost;
  const postTitle = formatSlugTitle(params.eventSlug);

  return buildMetadata(`${postTitle} News`, page.description);
}

export default function NewsDetailPage({ params }: PageProps) {
  return <PageContent params={params} />;
}