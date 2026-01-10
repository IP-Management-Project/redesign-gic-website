import { Link } from "@heroui/link";
import NextLink from "next/link";

import { title, subtitle } from "@/components/primitives";
import { getSiteContent } from "@/content/site-content";
import { localizeHref } from "@/lib/i18n";
import { getLocale } from "@/lib/server-locale";

type PersonPageProps = {
  params: { personSlug: string };
};

export default async function PersonPage({ params }: PersonPageProps) {
  const locale = await getLocale();
  const page = getSiteContent(locale).subpages.facultyStaff.personDetail;

  return (
    <section className="flex flex-col gap-6 py-8 md:py-10">
      <div>
        <h1 className={title()}>{params.personSlug}</h1>
        <p className={subtitle({ class: "mt-4" })}>
          {page.description}
        </p>
      </div>
      <div className="flex flex-wrap gap-4 text-sm">
        <Link as={NextLink} href={localizeHref(locale, "/research/projects")}>
          {page.links.projects}
        </Link>
        <Link as={NextLink} href={localizeHref(locale, "/research/publications")}>
          {page.links.publications}
        </Link>
        <Link as={NextLink} href={localizeHref(locale, "/student-life/student-projects")}>
          {page.links.studentProjects}
        </Link>
      </div>
    </section>
  );
}
