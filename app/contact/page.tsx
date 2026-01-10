import { title, subtitle } from "@/components/primitives";

import { siteConfig } from "@/config/site";

export default function ContactPage() {
  return (
    <section className="flex flex-col gap-6 py-8 md:py-10">
      <div>
        <h1 className={title()}>Contact</h1>
        <p className={subtitle({ class: "mt-4" })}>
          Reach out to our team for admissions, partnerships, or media requests.
        </p>
      </div>
      <div className="text-sm text-default-600">
        Email: {siteConfig.links.contactEmail}
      </div>
    </section>
  );
}
