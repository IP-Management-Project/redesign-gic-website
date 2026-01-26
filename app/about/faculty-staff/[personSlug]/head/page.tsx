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

  return buildMetadata(`${personName} - Department Head`, page.description);
}

export default function FacultyHeadPage({ params }: PageProps) {
  return <PageContent params={params} />;
}
