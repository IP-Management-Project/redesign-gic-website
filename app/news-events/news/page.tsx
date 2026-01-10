import { Link } from "@heroui/link";
import NextLink from "next/link";

import { title, subtitle } from "@/components/primitives";

export default function NewsPage() {
  return (
    <section className="flex flex-col gap-6 py-8 md:py-10">
      <div>
        <h1 className={title()}>News</h1>
        <p className={subtitle({ class: "mt-4" })}>
          Department updates, achievements, and announcements.
        </p>
      </div>
      <Link
        as={NextLink}
        className="text-sm text-default-600 hover:text-primary"
        href="/news-events/news/innovation-award"
      >
        Read a featured news post
      </Link>
    </section>
  );
}
