import { Link } from "@heroui/link";
import NextLink from "next/link";

import { title, subtitle } from "@/components/primitives";

export default function ApplyPage() {
  return (
    <section className="flex flex-col gap-6 py-8 md:py-10">
      <div>
        <h1 className={title()}>Apply to GIC</h1>
        <p className={subtitle({ class: "mt-4" })}>
          Start your application journey with program requirements and
          admissions guidance.
        </p>
      </div>
      <div className="flex flex-wrap gap-4 text-sm">
        <Link as={NextLink} href="/program">
          Program overview
        </Link>
        <Link as={NextLink} href="/program/faq">
          Admissions FAQ
        </Link>
      </div>
    </section>
  );
}
