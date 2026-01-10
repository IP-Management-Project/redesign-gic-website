import { title, subtitle } from "@/components/primitives";
import { getSiteContent } from "@/content/site-content";
import { getLocale } from "@/lib/server-locale";

export default async function VisionPage() {
  const locale = await getLocale();
  const page = getSiteContent(locale).subpages.about.vision;

  return (
    <div>
      <h1 className={title()}>{page.title}</h1>
      <p className={subtitle({ class: "mt-4" })}>
        {page.description}
      </p>
    </div>
  );
}
