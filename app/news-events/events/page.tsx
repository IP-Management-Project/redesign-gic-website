import { Link } from "@heroui/link";
import NextLink from "next/link";

import { title, subtitle } from "@/components/primitives";

export default function EventsPage() {
  return (
    <section className="flex flex-col gap-6 py-8 md:py-10">
      <div>
        <h1 className={title()}>Events</h1>
        <p className={subtitle({ class: "mt-4" })}>
          Seminars, workshops, and campus events for the GIC community.
        </p>
      </div>
      <Link
        as={NextLink}
        className="text-sm text-default-600 hover:text-primary"
        href="/news-events/events/innovation-day"
      >
        View a featured event
      </Link>
    </section>
  );
}
