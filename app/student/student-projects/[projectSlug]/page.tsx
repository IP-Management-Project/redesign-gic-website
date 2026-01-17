import { Link } from "@heroui/link";
import NextLink from "next/link";

import { title, subtitle } from "@/components/primitives";
import { getSiteContent } from "@/content/site-content";
import { localizeHref } from "@/lib/i18n";
import { getLocale } from "@/lib/server-locale";

type StudentProjectPageProps = {
  params: Promise<{ projectSlug: string }>;
};

export default async function StudentProjectPage({
  params,
}: StudentProjectPageProps) {
  const { projectSlug } = await params;
  const locale = await getLocale();
  const page = getSiteContent(locale).subpages.studentLife.studentProjectDetail;

  return (
    <section className="flex flex-col gap-6 py-8 md:py-10">
      <div>
        <h1 className={title()}>{projectSlug}</h1>
        <p className={subtitle({ class: "mt-4" })}>
          {page.description}
        </p>
      </div>
      <div className="flex flex-wrap gap-4 text-sm">
        <Link as={NextLink} href={localizeHref(locale, "/program")}>
          {page.links.program}
        </Link>
        <Link as={NextLink} href={localizeHref(locale, "/faculty-staff")}>
          {page.links.faculty}
        </Link>
        <Link as={NextLink} href={localizeHref(locale, "/research/labs")}>
          {page.links.lab}
        </Link>
      </div>
    </section>
  );
}
