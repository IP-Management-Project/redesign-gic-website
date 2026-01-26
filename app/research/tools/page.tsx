import { title, subtitle } from "@/components/primitives";
import { getSiteContent } from "@/content/site-content";
import { getLocale } from "@/lib/server-locale";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  const locale = await getLocale();
  const page = getSiteContent(locale).subpages.research.tools;

  return buildMetadata(page.title, page.description);
}

export default async function ResearchToolsPage() {
  const locale = await getLocale();
  const page = getSiteContent(locale).subpages.research.tools;

  return (
    <section className="flex flex-col gap-6 py-8 md:py-10">
      <div>
        <h1 className={title()}>{page.title}</h1>
        <p className={subtitle({ class: "mt-4" })}>
          {page.description}
        </p>
      </div>
    </section>
  );
}
