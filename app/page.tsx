import { button as buttonStyles } from "@heroui/theme";
import { Link } from "@heroui/link";
import NextLink from "next/link";

import { getSiteContent } from "@/content/site-content";
import { title, subtitle } from "@/components/primitives";
import { localizeHref } from "@/lib/i18n";
import { getLocale } from "@/lib/server-locale";

export default async function Home() {
  const locale = await getLocale();
  const content = getSiteContent(locale);

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-2xl text-center justify-center">
        <span className={title({ color: "blue" })}>{content.home.heroTitle}</span>
        <div className={subtitle({ class: "mt-4" })}>{content.home.heroSubtitle}</div>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        <Link
          as={NextLink}
          className={buttonStyles({
            color: "primary",
            radius: "full",
            variant: "shadow",
          })}
          href={localizeHref(locale, content.home.ctas.primary.href)}
        >
          {content.home.ctas.primary.label}
        </Link>
        <Link
          as={NextLink}
          className={buttonStyles({ variant: "bordered", radius: "full" })}
          href={localizeHref(locale, content.home.ctas.secondary.href)}
        >
          {content.home.ctas.secondary.label}
        </Link>
      </div>

      <div className="grid w-full max-w-4xl gap-6 pt-8 md:grid-cols-3">
        {content.home.highlights.map((card) => (
          <Link
            key={card.title}
            as={NextLink}
            className="rounded-2xl border border-default-200/70 bg-background px-6 py-5 text-left shadow-sm transition hover:border-primary"
            href={localizeHref(locale, card.href)}
          >
            <h2 className="text-lg font-semibold">{card.title}</h2>
            <p className="mt-2 text-sm text-default-600">{card.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
