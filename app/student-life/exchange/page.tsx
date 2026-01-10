import { Link } from "@heroui/link";
import NextLink from "next/link";

import { title, subtitle } from "@/components/primitives";
import { getSiteContent } from "@/content/site-content";
import { localizeHref } from "@/lib/i18n";
import { getLocale } from "@/lib/server-locale";

export default async function ExchangePage() {
  const locale = await getLocale();
  const page = getSiteContent(locale).subpages.studentLife;

  return (
    <section className="flex flex-col gap-6 py-8 md:py-10">
      <div>
        <h1 className={title()}>{page.exchange.title}</h1>
        <p className={subtitle({ class: "mt-4" })}>
          {page.exchange.description}
        </p>
      </div>
      <div className="flex flex-wrap gap-4 text-sm">
        {page.exchangeLinks.map((link) => (
          <Link key={link.href} as={NextLink} href={localizeHref(locale, link.href)}>
            {link.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
