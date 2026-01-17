import { title, subtitle } from "@/components/primitives";

import { getSiteContent } from "@/content/site-content";
import { getLocale } from "@/lib/server-locale";

export default async function ContactPage() {
  const locale = await getLocale();
  const content = getSiteContent(locale);
  const page = content.contact;

  return (
    <section className="flex flex-col gap-6 py-8 md:py-10">
      <div>
        <h1 className={title()}>{page.title}</h1>
        <p className={subtitle({ class: "mt-4" })}>
          {page.description}
        </p>
      </div>
      <div className="text-sm text-default-600">
        {page.emailLabel}: {page.email}
      </div>
    </section>
  );
}
