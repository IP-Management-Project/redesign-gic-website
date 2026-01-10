import { Link } from "@heroui/link";
import NextLink from "next/link";

import { title, subtitle } from "@/components/primitives";

export default function ExchangePage() {
  return (
    <section className="flex flex-col gap-6 py-8 md:py-10">
      <div>
        <h1 className={title()}>Exchange Students</h1>
        <p className={subtitle({ class: "mt-4" })}>
          Overview of international study options, partner universities, and
          application guidance.
        </p>
      </div>
      <div className="flex flex-wrap gap-4 text-sm">
        <Link as={NextLink} href="/student-life/exchange/incoming">
          Incoming students
        </Link>
        <Link as={NextLink} href="/student-life/exchange/outgoing">
          Outgoing students
        </Link>
        <Link as={NextLink} href="/program">
          Program details
        </Link>
        <Link as={NextLink} href="/student-life/testimonials">
          Exchange testimonials
        </Link>
        <Link as={NextLink} href="/news-events/calendar">
          Events calendar
        </Link>
      </div>
    </section>
  );
}
