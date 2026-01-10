import { Link } from "@heroui/link";
import NextLink from "next/link";

import { title, subtitle } from "@/components/primitives";

export default function ProgramPage() {
  return (
    <section className="flex flex-col gap-6 py-8 md:py-10">
      <div>
        <h1 className={title()}>Program</h1>
        <p className={subtitle({ class: "mt-4" })}>
          Explore undergraduate and graduate offerings, admissions information,
          and student outcomes.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {[
          { label: "Degrees", href: "/program/degrees" },
          { label: "FAQ", href: "/program/faq" },
          { label: "Scholarships", href: "/program/scholarships" },
          { label: "Careers", href: "/program/careers" },
        ].map((item) => (
          <Link
            key={item.href}
            as={NextLink}
            className="rounded-xl border border-default-200/70 p-4 text-sm text-default-600 hover:border-primary"
            href={item.href}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
