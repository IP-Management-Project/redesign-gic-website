import { Link } from "@heroui/link";
import NextLink from "next/link";

import { title, subtitle } from "@/components/primitives";
import { getSiteContent } from "@/content/site-content";
import { localizeHref } from "@/lib/i18n";
import { getLocale } from "@/lib/server-locale";

type LabPageProps = {
  params: { labSlug: string };
};

export default async function LabPage({ params }: LabPageProps) {
  const locale = await getLocale();
  const page = getSiteContent(locale).subpages.research.labDetail;

  return (
    <section className="flex flex-col gap-6 py-8 md:py-10">
      <div>
        <h1 className={title()}>
          {params.labSlug} {page.titleSuffix}
        </h1>
        <p className={subtitle({ class: "mt-4" })}>
          {page.description}
        </p>
      </div>
      <div className="flex flex-wrap gap-4 text-sm">
        <Link as={NextLink} href={localizeHref(locale, "/faculty-staff")}>
          {page.links.team}
        </Link>
        <Link as={NextLink} href={localizeHref(locale, "/research/projects")}>
          {page.links.projects}
        </Link>
        <Link as={NextLink} href={localizeHref(locale, "/research/publications")}>
          {page.links.publications}
        </Link>
      </div>
    </section>
  );
}
