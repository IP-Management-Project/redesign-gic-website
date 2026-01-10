import { Link } from "@heroui/link";
import NextLink from "next/link";

import { title, subtitle } from "@/components/primitives";
import { getSiteContent } from "@/content/site-content";
import { localizeHref } from "@/lib/i18n";
import { getLocale } from "@/lib/server-locale";

export default async function AboutPage() {
  const locale = await getLocale();
  const content = getSiteContent(locale);
  const page = content.pages.about;

  return (
    <div>
      <h1 className={title()}>{page.title}</h1>
      <p className={subtitle({ class: "mt-4" })}>
        {page.description}
      </p>
      <div className="mt-6 flex flex-wrap gap-4 text-sm text-default-600">
        {page.links?.map((link) => (
          <Link
            key={link.href}
            as={NextLink}
            href={localizeHref(locale, link.href)}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
