import { Link } from "@heroui/link";
import NextLink from "next/link";

import { title, subtitle } from "@/components/primitives";

export default function ResearchLabsPage() {
  return (
    <section className="flex flex-col gap-6 py-8 md:py-10">
      <div>
        <h1 className={title()}>Labs</h1>
        <p className={subtitle({ class: "mt-4" })}>
          Explore focus areas, team members, and ongoing research in our labs.
        </p>
      </div>
      <Link
        as={NextLink}
        className="text-sm text-default-600 hover:text-primary"
        href="/research/labs/innovation-lab"
      >
        View a sample lab profile
      </Link>
    </section>
  );
}
