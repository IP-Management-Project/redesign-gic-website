import { Link } from "@heroui/link";
import NextLink from "next/link";

import { title, subtitle } from "@/components/primitives";
import { getSiteContent } from "@/content/site-content";
import { localizeHref } from "@/lib/i18n";
import { getLocale } from "@/lib/server-locale";

export default async function StudentLifePage() {
  const locale = await getLocale();
  const content = getSiteContent(locale);
  const page = content.pages.studentLife;

  return (
    <section className="flex flex-col gap-6 py-8 md:py-10">
      <div>
        <h1 className={title()}>{page.title}</h1>
        <p className={subtitle({ class: "mt-4" })}>
          {page.description}
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
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
