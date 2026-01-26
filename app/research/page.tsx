import { Link } from "@heroui/link";
import NextLink from "next/link";

import { title, subtitle } from "@/components/primitives";
import { getSiteContent } from "@/content/site-content";
import { localizeHref } from "@/lib/i18n";
import { getLocale } from "@/lib/server-locale";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  const locale = await getLocale();
  const page = getSiteContent(locale).pages.research;

  return buildMetadata(page.title, page.description);
}

export default async function ResearchPage() {
  const locale = await getLocale();
  const content = getSiteContent(locale);
  const page = content.pages.research;

  return (
    <section className="flex flex-col gap-6 py-8 md:py-10">
      <div>
        <h1 className={title()}>{page.title}</h1>
        <p className={subtitle({ class: "mt-4" })}>
          {page.description}
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        {page.cards?.map((item) => (
          <Link
            key={item.href}
            as={NextLink}
            className="rounded-xl border border-default-200/70 p-4 text-sm text-default-600 hover:border-primary"
            href={localizeHref(locale, item.href)}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
