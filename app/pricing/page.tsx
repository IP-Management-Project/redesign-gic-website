import { title } from "@/components/primitives";
import { getSiteContent } from "@/content/site-content";
import { getLocale } from "@/lib/server-locale";

export default async function PricingPage() {
  const locale = await getLocale();
  const content = getSiteContent(locale);

  return (
    <div>
      <h1 className={title()}>{content.pages.pricing.title}</h1>
    </div>
  );
}
