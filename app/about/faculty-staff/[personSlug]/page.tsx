import { getSiteContent } from "@/content/site-content";
import { getLocale } from "@/lib/server-locale";
import { buildMetadata, formatSlugTitle } from "@/lib/seo";

import PageContent from "./page-content";

type PageProps = {
  params: Promise<{ personSlug: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const locale = await getLocale();
  const param = await params
  const page = getSiteContent(locale).subpages.facultyStaff.personDetail;
  const personName = formatSlugTitle(param.personSlug);

  return buildMetadata(`${personName} - Faculty Profile`, page.description);
}

export default async function FacultyDetailPage({ params }: PageProps) {
  const param = await params
  return <PageContent params={param} />;
}
