import { Link } from "@heroui/link";
import NextLink from "next/link";

import { title, subtitle } from "@/components/primitives";

type EventPageProps = {
  params: { eventSlug: string };
};

export default function EventPage({ params }: EventPageProps) {
  return (
    <section className="flex flex-col gap-6 py-8 md:py-10">
      <div>
        <h1 className={title()}>{params.eventSlug}</h1>
        <p className={subtitle({ class: "mt-4" })}>
          Event details, agenda, and related resources.
        </p>
      </div>
      <div className="flex flex-wrap gap-4 text-sm">
        <Link as={NextLink} href="/news-events/calendar">
          View calendar
        </Link>
        <Link as={NextLink} href="/student-life">
          Student life
        </Link>
      </div>
    </section>
  );
}
