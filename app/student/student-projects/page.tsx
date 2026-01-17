import { Link } from "@heroui/link";
import NextLink from "next/link";

import { title, subtitle } from "@/components/primitives";
import { getSiteContent } from "@/content/site-content";
import { localizeHref } from "@/lib/i18n";
import { getLocale } from "@/lib/server-locale";

export default async function StudentProjectsPage() {
  const locale = await getLocale();
  const page = getSiteContent(locale).subpages.studentLife.studentProjects;
  const featured = page.featured!;

  return (
    <section className="flex flex-col gap-6 py-8 md:py-10">
      <div>
        <h1 className={title()}>{page.title}</h1>
        <p className={subtitle({ class: "mt-4" })}>
          {page.description}
        </p>
      </div>
      <Link
        as={NextLink}
        className="text-sm text-default-600 hover:text-primary"
        href={localizeHref(locale, featured.href)}
      >
        {featured.label}
      </Link>
    </section>
  );
}
