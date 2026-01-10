import { Link } from "@heroui/link";
import NextLink from "next/link";

import { title, subtitle } from "@/components/primitives";

export default function ResearchPage() {
  return (
    <section className="flex flex-col gap-6 py-8 md:py-10">
      <div>
        <h1 className={title()}>Research</h1>
        <p className={subtitle({ class: "mt-4" })}>
          Discover labs, projects, publications, and tools that showcase our
          research impact.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        {[
          { label: "Labs", href: "/research/labs" },
          { label: "Projects", href: "/research/projects" },
          { label: "Publications", href: "/research/publications" },
          { label: "Tools", href: "/research/tools" },
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
