import { title, subtitle } from "@/components/primitives";
import { getSiteContent } from "@/content/site-content";
import { getLocale } from "@/lib/server-locale";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  const locale = await getLocale();
  const page = getSiteContent(locale).subpages.project.erasmusAlien;

  return buildMetadata(page.title, page.description);
}

export default async function ErasmusAlienPage() {
  const locale = await getLocale();
  const page = getSiteContent(locale).subpages.project.erasmusAlien;

  return (
    <section className="flex flex-col gap-6 py-8 md:py-10">
      <div>
        <h1 className={title()}>{page.title}</h1>
        {page.description ? (
          <p className={subtitle({ class: "mt-4" })}>{page.description}</p>
        ) : null}
      </div>
    </section>
  );
}
