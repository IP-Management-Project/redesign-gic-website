import { Link } from "@heroui/link";
import NextLink from "next/link";

import { title, subtitle } from "@/components/primitives";
import { getSiteContent } from "@/content/site-content";
import { localizeHref } from "@/lib/i18n";
import { getLocale } from "@/lib/server-locale";

type NewsPostPageProps = {
  params: Promise<{ postSlug: string }>;
};

export default async function NewsPostPage({ params }: NewsPostPageProps) {
  const { postSlug } = await params;
  const locale = await getLocale();
  const page = getSiteContent(locale).subpages.newsEvents.newsPost;

  return (
    <section className="flex flex-col gap-6 py-8 md:py-10">
      <div>
        <h1 className={title()}>{postSlug}</h1>
        <p className={subtitle({ class: "mt-4" })}>
          {page.description}
        </p>
      </div>
      <div className="flex flex-wrap gap-4 text-sm">
        <Link as={NextLink} href={localizeHref(locale, "/research")}>
          {page.links.research}
        </Link>
        <Link as={NextLink} href={localizeHref(locale, "/news-events/events")}>
          {page.links.events}
        </Link>
      </div>
    </section>
  );
}
