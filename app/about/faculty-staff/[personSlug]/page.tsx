import { getSiteContent } from "@/content/site-content";
import { getLocale } from "@/lib/server-locale";
import { buildMetadata, formatSlugTitle } from "@/lib/seo";

import PageContent from "./page-content";

type PageProps = {
  params: { personSlug: string };
};

export async function generateMetadata({ params }: PageProps) {
  const locale = await getLocale();
  const page = getSiteContent(locale).subpages.facultyStaff.personDetail;
  const personName = formatSlugTitle(params.personSlug);

  return buildMetadata(`${personName} - Faculty Profile`, page.description);
}

export default function FacultyDetailPage({ params }: PageProps) {
  return <PageContent params={params} />;
}
