import { Link } from "@heroui/link";
import NextLink from "next/link";

import { title, subtitle } from "@/components/primitives";

type NewsPostPageProps = {
  params: { postSlug: string };
};

export default function NewsPostPage({ params }: NewsPostPageProps) {
  return (
    <section className="flex flex-col gap-6 py-8 md:py-10">
      <div>
        <h1 className={title()}>{params.postSlug}</h1>
        <p className={subtitle({ class: "mt-4" })}>
          News post details with related research, programs, or events.
        </p>
      </div>
      <div className="flex flex-wrap gap-4 text-sm">
        <Link as={NextLink} href="/research">
          Related research
        </Link>
        <Link as={NextLink} href="/news-events/events">
          Upcoming events
        </Link>
      </div>
    </section>
  );
}
