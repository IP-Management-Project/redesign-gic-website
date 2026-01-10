import { Link } from "@heroui/link";
import NextLink from "next/link";

import { title, subtitle } from "@/components/primitives";

export default function ProgramDegreesPage() {
  return (
    <section className="flex flex-col gap-6 py-8 md:py-10">
      <div>
        <h1 className={title()}>Degrees</h1>
        <p className={subtitle({ class: "mt-4" })}>
          Browse undergraduate and graduate degrees offered at GIC.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {[
          { label: "Computer Engineering", href: "/program/degrees/computer-engineering" },
          { label: "Electrical Engineering", href: "/program/degrees/electrical-engineering" },
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
