import { getSiteContent } from "@/content/site-content";
import { getLocale } from "@/lib/server-locale";
import { buildMetadata, formatSlugTitle } from "@/lib/seo";

import PageContent from "./page-content";

type PageProps = {
  params: { eventSlug: string };
};

export async function generateMetadata({ params }: PageProps) {
  const locale = await getLocale();
  const page = getSiteContent(locale).subpages.newsEvents.eventDetail;
  const eventTitle = formatSlugTitle(params.eventSlug);

  return buildMetadata(`${eventTitle} Event`, page.description);
}

export default function EventDetailPage({ params }: PageProps) {
  return <PageContent params={params} />;
}
