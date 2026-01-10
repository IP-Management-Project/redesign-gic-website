import { Link } from "@heroui/link";
import NextLink from "next/link";

import { title, subtitle } from "@/components/primitives";
import { getSiteContent } from "@/content/site-content";
import { localizeHref } from "@/lib/i18n";
import { getLocale } from "@/lib/server-locale";

type DegreePageProps = {
  params: { degreeSlug: string };
};

export default async function DegreePage({ params }: DegreePageProps) {
  const locale = await getLocale();
  const page = getSiteContent(locale).subpages.program.degreeDetail;

  return (
    <section className="flex flex-col gap-6 py-8 md:py-10">
      <div>
        <h1 className={title()}>
          {params.degreeSlug} {page.titleSuffix}
        </h1>
        <p className={subtitle({ class: "mt-4" })}>
          {page.description}
        </p>
      </div>
      <div className="flex flex-wrap gap-4 text-sm">
        <Link
          as={NextLink}
          className="text-default-600 hover:text-primary"
          href={localizeHref(
            locale,
            `/program/degrees/${params.degreeSlug}/curriculum`,
          )}
        >
          {page.links.curriculum}
        </Link>
        <Link
          as={NextLink}
          className="text-default-600 hover:text-primary"
          href={localizeHref(
            locale,
            `/program/degrees/${params.degreeSlug}/admissions`,
          )}
        >
          {page.links.admissions}
        </Link>
        <Link
          as={NextLink}
          className="text-default-600 hover:text-primary"
          href={localizeHref(locale, "/research/labs")}
        >
          {page.links.relatedLabs}
        </Link>
      </div>
    </section>
  );
}
